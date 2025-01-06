/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/header/header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/footer/footer';
import { Notification } from './components/NotificationComponent/notification';
import { Todo } from './types/Todo';
import { filterTodos } from './utils/FilterTodos';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FilterType.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const resultFilterdTodos = filterTodos(currentFilter, todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setTodos={setTodos} setError={setError} />

        {resultFilterdTodos.length > 0 && (
          <TodoList todos={resultFilterdTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            setCurrentFilter={setCurrentFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification error={error} setError={setError} />
    </div>
  );
};
