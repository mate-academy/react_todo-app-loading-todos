/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Authorization } from './components/authorization';
import { LogingSteps } from './types/enum';
import { UserData } from './types/userData';
import { Todo } from './types/Todo';
import {
  deleteTodoOnServer,
  getTodosFromServer,
  setTodoCompleteStatus,
  setTodoOnServer,
} from './api';
import { TodoItem } from './components/Todo';

const defaultUser = {
  createdAt: '2023-07-10T13:09:53.578Z',
  email: 'gookidoo@gmail.com',
  id: 11038,
  name: 'Віктор Булденко',
  phone: null,
  updatedAt: '2023-07-10T13:09:53.578Z',
  username: null,
  website: null,
};

enum Etodos {
  ALL,
  ACTIVE,
  COMPLETED,
  CLEAR,
}

export const App: React.FC = () => {
  // const [step, setStep] = useState(LogingSteps.EMAIL);
  const [step, setStep] = useState(LogingSteps.COMPLETE);
  const [user, setUser] = useState<UserData>(defaultUser);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [uncomplete, setUncomplete] = useState<number>();
  const [todoInput, setTodoInput] = useState('');
  const [sortTodosBy, setSortTodosBy] = useState<Etodos>(Etodos.ALL);
  const [showClear, setShowClear] = useState(false);
  const [toggleActiveTodos, setToggleActiveTodos] = useState(true);

  // #region functions
  const toggleTodosActive = () => {
    const promiseList = todos.map(todo => {
      if (todo.completed !== toggleActiveTodos) {
        return setTodoCompleteStatus(todo.id, { completed: toggleActiveTodos });
      }

      return [];
    });

    setToggleActiveTodos(!toggleActiveTodos);

    Promise.all(promiseList)
      .then(() => {
        getTodosFromServer(user.id).then((todoList) => {
          setTodos(todoList);
        });
      });
  };

  const checkCompletedTodo = (arr: Todo[]) => {
    let status = false;
    let counter = 0;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].completed) {
        status = true;
      } else {
        counter += 1;
      }
    }

    setUncomplete(counter);
    setShowClear(status);
  };

  const todoFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoOnServer(todoInput.trim(), user.id).then(() => {
      getTodosFromServer(user.id).then((todoList) => {
        setTodos(todoList);
        checkCompletedTodo(todoList);
      });
    });
    setTodoInput('');
  };

  const deleteTodo = (id: number) => {
    deleteTodoOnServer(id).then(() => {
      getTodosFromServer(user.id).then((todoList) => {
        setTodos(todoList);
        checkCompletedTodo(todoList);
      });
    });
  };

  const updateTodo = (todoId: number, obj: Partial<Todo>) => {
    setTodoCompleteStatus(todoId, obj).then(() => {
      getTodosFromServer(user.id).then((todoList) => {
        setTodos(todoList);
        checkCompletedTodo(todoList);
      });
    });
  };

  const displayTodos = (sortBy: Etodos) => {
    const BASE_URL = 'https://mate.academy/students-api';
    let endpoint = '';

    const deleteCompleted = () => {
      fetch(`${BASE_URL}/todos?userId=${user.id}&completed=true`)
        .then((data) => data.json())
        .then((todoList) => {
          todoList.forEach((todo: Todo) => deleteTodoOnServer(todo.id));
        })
        .then(() => getTodosFromServer(user.id))
        .then((todoList) => {
          checkCompletedTodo(todoList);
          setTodos(todoList);
        })
        .catch((error) => new Error(error.message));
    };

    switch (sortBy) {
      case Etodos.ACTIVE:
        endpoint = `/todos?userId=${user.id}&completed=false`;
        break;

      case Etodos.COMPLETED:
        endpoint = `/todos?userId=${user.id}&completed=true`;
        break;

      case Etodos.CLEAR:
        return deleteCompleted();

      default:
        return getTodosFromServer(user.id).then((todoList) => {
          checkCompletedTodo(todoList);
          setTodos(todoList);
        });
    }

    return fetch(`${BASE_URL}${endpoint}`)
      .then((data) => data.json())
      .then((todoList) => {
        checkCompletedTodo(todoList);
        setTodos(todoList);
      })
      .catch((error) => new Error(error.message));
  };

  useEffect(() => {
    displayTodos(sortTodosBy);
  }, [sortTodosBy]);

  if (step !== LogingSteps.COMPLETE) {
    return <Authorization step={step} setStep={setStep} setUser={setUser} />;
  }
  // #endregion

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {Boolean(todos.length) && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              onClick={toggleTodosActive}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={todoFormHandler}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todos.map((todoObj) => (
            <TodoItem
              todo={todoObj}
              deleteTodo={deleteTodo}
              key={todoObj.id}
              updateTodo={updateTodo}
            />
          ))}

        </section>

        {/* Hide the footer if there are no todos */}
        { Boolean(todos.length) && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${uncomplete} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={
                  classNames('filter__link',
                    { selected: sortTodosBy === Etodos.ALL })
                }
                onClick={() => setSortTodosBy(Etodos.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  classNames('filter__link',
                    { selected: sortTodosBy === Etodos.ACTIVE })
                }
                onClick={() => setSortTodosBy(Etodos.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  classNames('filter__link',
                    { selected: sortTodosBy === Etodos.COMPLETED })
                }
                onClick={() => setSortTodosBy(Etodos.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            {showClear
            && (
              <button
                type="button"
                className="todoapp__clear-completed"
                onClick={() => setSortTodosBy(Etodos.CLEAR)}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
