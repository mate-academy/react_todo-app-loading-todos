/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { getTodos } from './api/todos';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterStatus } from './types/FilterStatus';

const USER_ID = 10906;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<
  FilterStatus>(FilterStatus.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.LOAD);
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  const handleDeleteError = () => {
    setErrorMessage(null);
  };

  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed)
  ), [todos]);

  const completedTodos = useMemo(() => (
    todos.filter(todo => todo.completed)
  ), [todos]);

  const visibleTodos = useMemo(() => {
    switch (selectedFilter) {
      case FilterStatus.ACTIVE:
        return activeTodos;

      case FilterStatus.COMPLETED:
        return completedTodos;

      default:
        return todos;
    }
  }, [todos, selectedFilter]);

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
          />

          <NewTodo
            setNewTodoTitle={setNewTodoTitle}
            newTodoTitle={newTodoTitle}
            setErrorMessage={setErrorMessage}
          />

        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${activeTodos.length} items left`}
              </span>

              <Filter
                setSelectedFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
              />

              {completedTodos && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}

            </footer>
          </>
        )}
      </div>

      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal', {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={handleDeleteError}
        />

        {errorMessage}
        <br />
      </div>
    </div>
  );
};
