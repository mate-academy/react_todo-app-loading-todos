/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { getTodos } from './api/todos';

const USER_ID = 10906;

enum ErrorMessages {
  load = 'Unable to load the todos',
  add = 'Unable to add a todo',
  remove = 'Unable to delete a todo',
  update = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.load);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const handleClickDeleteButton = () => {
    setErrorMessage('');
  };

  const visibleTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case 'Active':
        return todo.completed === false;

      case 'Completed':
        return todo.completed === true;

      default:
        return todo;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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
          onClick={handleClickDeleteButton}
        />

        {errorMessage}
        <br />
      </div>
    </div>
  );
};
