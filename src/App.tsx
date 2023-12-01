/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodosList } from './components/TodosList';
import { TodosFilter } from './components/TododsFilter';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { Filter } from './types/Filter';

const USER_ID = 11903;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [status, setStatus] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    todoService.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsHidden(false);
        setErrorMessage('Unable to load todos');
      })
      .finally(() => {
        setTimeout(() => setIsHidden(true), 3000);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const completedTodo = todos.some(todo => todo.completed);

  const handleOnBlur = () => {
    if (todoTitle.trim()) {
      todoService.createTodo({
        userId: USER_ID,
        title: todoTitle,
        completed: false,
      })
        .then(newTodo => {
          setTodos(currentTodos => [...currentTodos, newTodo]);
        })
        .catch(() => {
          setIsHidden(false);
          setErrorMessage('Unable to add a todo');
        })
        .finally(() => {
          setTimeout(() => setIsHidden(true), 3000);
        });
    }

    setTodoTitle('');
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOnBlur();
  };

  const deleteTodo = (todoId: number) => {
    todoService.deleteTodo(todoId);
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const count = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form
            onBlur={handleOnBlur}
            onSubmit={handleOnSubmit}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
            />
          </form>
        </header>

        {todos && (
          <TodosList
            todos={filteredTodos}
            onDelete={deleteTodo}
          />
        )}
        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {count === 1 ? (
                `${count} item left`
              ) : (
                `${count} items left`
              )}
            </span>

            <TodosFilter
              status={status}
              setStatus={setStatus}
            />

            {completedTodo && (
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

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: isHidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsHidden(true)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
