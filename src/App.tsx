/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';

const USER_ID = 11368;

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>(Filter.all);
  const [errorMessage, setErrorMessage] = useState('');

  function hideError() {
    setTimeout(() => setErrorMessage(''), 3000);
  }

  function isCompletedTodos() {
    return todos.some(currentTodo => currentTodo.completed);
  }

  function getQuantityOfActiveTodos(todo: Todo[]) {
    const activeTodo = todo.filter(currentTodo => !currentTodo.completed);

    return activeTodo.length;
  }

  const numberOfActive = useMemo(() => {
    return getQuantityOfActiveTodos(todos);
  }, [todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodo)
      .catch(() => {
        setErrorMessage('Unable to load Todo');
        hideError();
      });
  }, []);

  const getFilteredTodo = (filterMode: string) => {
    switch (filterMode) {
      case Filter.all:
        return todos;

      case Filter.active:
        return todos.filter(currentTodo => !currentTodo.completed);

      case Filter.completed:
        return todos.filter(currentTodo => currentTodo.completed);

      default:
        break;
    }

    return todos;
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={getFilteredTodo(query)} />

        {!!todos.length && (
          <TodoFooter
            changeQuery={setQuery}
            completed={isCompletedTodos()}
            active={numberOfActive}
          />
        )}

      </div>

      {errorMessage
        && (
          <div className="
            notification is-danger
            is-light
            has-text-weight-normal"
          >
            <button type="button" className="delete" />
            {errorMessage}
          </div>
        )}
    </div>
  );
};
