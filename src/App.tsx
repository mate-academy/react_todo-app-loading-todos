import React, { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { filterTodos } from './utils/helpers';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { NotificationError } from './components/NotificationError';

const USER_ID = 6922;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [error, setError] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch (err) {
      setError('load');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [todos]);

  const visibleTodos = filterTodos(todos, todoStatus);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            aria-label="make all todos active"
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <TodoFilter
            todos={visibleTodos}
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
          />
        )}
      </div>

      <NotificationError error={error} setError={setError} />
    </div>
  );
};
