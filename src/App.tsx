/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoServise from './api/todos';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { TodoList } from './component/TodoList/TodoList';

function filteredTodos(todos: Todo[], completed?: boolean) {
  let newTodosList = [...todos];

  if (completed !== undefined) {
    newTodosList = newTodosList.filter(todo => todo.completed === completed);
  }

  return newTodosList;
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stateTodo, setStateTodo] = useState<boolean | undefined>();

  const todoCompleteList = filteredTodos(todoList, stateTodo);

  const completedAll = todoList.every(todo => todo.completed);
  const itemLeft = todoList.filter(todo => todo.completed === false).length;

  useEffect(() => {
    todoServise
      .getTodos()
      .then(setTodoList)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!todoServise.USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim().length === 0) {
      setErrorMessage('Title should not be empty');

      return;
    }

    todoServise
      .addTodos(title)
      .then(todo => {
        setTodoList(currentList => [...currentList, todo]);
      })
      .catch(eroor => {
        throw eroor;
      });

    setTitle('');
    setErrorMessage('');
  };

  const deleteTodo = (todoId: number) => {
    setTodoList(currentTodoList =>
      currentTodoList.filter(todo => todo.id !== todoId),
    );

    return todoServise.deleteTodos(todoId).catch(error => {
      setTodoList(todoList);
      setErrorMessage('Unable to delete a todo');
      throw error;
    });
  };

  const handleCompletedAll = () => {
    setTodoList(currentTodo =>
      currentTodo.map(todo => ({
        ...todo,
        completed: !completedAll,
      })),
    );

    todoList.map(todo =>
      todoServise.patchTodos(todo.id, { completed: !completedAll }),
    );
  };

  const handleCompleted = (todoId: number) => {
    setTodoList(currentTodo =>
      currentTodo.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );

    const todoUpdete = todoList.find(todo => todo.id === todoId);

    if (todoUpdete) {
      return todoServise.patchTodos(todoId, {
        completed: !todoUpdete.completed,
      });
    }
  };

  const clearComplete = () => {
    return setTodoList(currentList =>
      currentList.filter(todo => {
        if (todo.completed === true) {
          todoServise.deleteTodos(todo.id);
        }
      }),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todoCompleteList.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: completedAll,
              })}
              data-cy="ToggleAllButton"
              onClick={handleCompletedAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              value={title}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        {todoList.length > 0 && (
          <>
            <TodoList
              deleteTodos={deleteTodo}
              todoList={todoCompleteList}
              completed={handleCompleted}
            />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {itemLeft} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={cn('filter__link', {
                    selected: stateTodo === undefined,
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setStateTodo(undefined)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn('filter__link', {
                    selected: stateTodo === false,
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setStateTodo(false)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn('filter__link', {
                    selected: stateTodo === true,
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setStateTodo(true)}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                // disabled={() => {}}
                onClick={clearComplete}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
        {/*
        Unable to add a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
