/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem/TodoItem';
import { ErrorMessage } from './types/ErrorMessage';
import { FilteringBy } from './types/FilteringBy';

const USER_ID = 76;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editedTodoId, setEditedTodoId] = useState<null | number>(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState('');
  // const [isSubmiting, setSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [filteringBy, setFilteringBy] = useState(FilteringBy.default);

  const filteredTodos = todos.filter((todo) => {
    switch (filteringBy) {
      case FilteringBy.active:
        return !todo.completed;
      case FilteringBy.completed:
        return todo.completed;
      default: return true;
    }
  });

  const countOfComplitedTodos = todos.filter((todo) => !todo.completed).length;

  const isAnyCompletedTodo = todos.some((todo) => todo.completed);

  const isAllCompleted = useMemo(() => {
    return todos.every((todo) => todo.completed);
  }, [todos]);

  const handlerFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    // setSubmiting(true);

    const newTodo = {
      id: +new Date(),
      userId: USER_ID,
      title: newTodoTitle,
      completed: false,
    };

    todoService.addTodo(USER_ID, newTodo).then(() => {
      todoService.getTodos(USER_ID)
        .then(setTodos)
        .catch(() => {
          setErrorMessage(ErrorMessage.UnableToLoadTodos);
        });
      setNewTodoTitle('');
      // setSubmiting(false);
    });
  };

  const handleDeleteTodo = (todoId: number) => {
    // setSubmiting(true);
    todoService.deleteTodo(todoId).then(() => {
      todoService.getTodos(USER_ID).then(setTodos);
      // setSubmiting(false);
    });
  };

  const handleEditTodo = (
    event: React.FormEvent<HTMLFormElement>, todoId: number,
  ) => {
    event.preventDefault();

    if (editedTodoTitle) {
      todoService.editTodo(todoId, { title: editedTodoTitle })
        .then(() => {
          todoService.getTodos(USER_ID).then(setTodos);
          setEditedTodoId(null);
        });
    }
  };

  const handleSpanDoubleClick = (
    id: number,
    title: string,
    input: React.MutableRefObject<HTMLInputElement | null>,
  ) => {
    setEditedTodoId(id);
    setEditedTodoTitle(title);

    // console.log(input.current);

    if (input.current) {
      input.current.focus();
    }
  };

  const handleCompleteChange = (todoId: number, checked: boolean) => {
    todoService.editTodo(todoId, { completed: checked })
      .then(() => {
        todoService.getTodos(USER_ID).then(setTodos);
        setEditedTodoId(null);
      });
  };

  const handleSetAllAsComplited = () => {
    // console.log(isAllCompleted);

    if (!isAllCompleted) {
      todos.forEach(todo => {
        if (!todo.completed) {
          handleCompleteChange(todo.id, true);
        }
      });
    } else {
      todos.forEach(todo => {
        handleCompleteChange(todo.id, false);
      });
    }
  };

  useEffect(() => {
    todoService.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableToLoadTodos);

        setTimeout(() => setErrorMessage(null), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            onClick={handleSetAllAsComplited}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handlerFormSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={(event) => setNewTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editedTodoTitle={editedTodoTitle}
              setEditedTodoTitle={setEditedTodoTitle}
              handleSpanDoubleClick={handleSpanDoubleClick}
              handleDeleteTodo={handleDeleteTodo}
              editedTodoId={editedTodoId}
              handleEditTodo={handleEditTodo}
              handleCompleteChange={handleCompleteChange}
            />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${countOfComplitedTodos} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filteringBy === FilteringBy.default,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilteringBy(FilteringBy.default)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filteringBy === FilteringBy.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilteringBy(FilteringBy.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filteringBy === FilteringBy.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilteringBy(FilteringBy.completed)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            {isAnyCompletedTodo && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}

          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal', {
            'is-active': errorMessage,
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
