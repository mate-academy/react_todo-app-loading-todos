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
  const [isCompleted, setCompleted] = useState(false);
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

  if (isCompletedTodos()) {
    setCompleted(true);
  }

  const numberOfActive = useMemo(() => {
    return getQuantityOfActiveTodos(todos);
  }, [todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((currentTodo) => {
        setTodo(currentTodo);
      })
      .catch(() => {
        setErrorMessage('Unable to load Todo');
        hideError();
      });
  }, []);

  const getFilteredTodo = (filterMode: string) => {
    let filteredTodos: Todo[] = [];

    switch (filterMode) {
      case Filter.all:
        filteredTodos = todos;

        return filteredTodos;

      case Filter.active:
        filteredTodos = todos.filter(currentTodo => !currentTodo.completed);

        return filteredTodos;

      case Filter.completed:
        filteredTodos = todos.filter(currentTodo => currentTodo.completed);

        return filteredTodos;

      default:
        break;
    }

    return filteredTodos;
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
            completed={isCompleted}
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
