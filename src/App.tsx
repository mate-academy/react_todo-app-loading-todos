/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Error } from './types/Error';

import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { TodoList } from './Components/TodoList/TodoList';
import { ErrorNotification } from './Components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error | ''>('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(Error.LoadTodos);
      });
  }, []);

  const filterTodosByStatus = (_todos: Todo[], filterBy: string) => {
    switch (filterBy) {
      case 'active':
        return _todos.filter(todo => !todo.completed);
      case 'completed':
        return _todos.filter(todo => todo.completed);
      default:
        return _todos;
    }
  };

  const visibleTodos = filterTodosByStatus(todos, status);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList visibleTodos={visibleTodos} />
        {!!todos.length && (
          <Footer todos={todos} setStatus={setStatus} status={status} />
        )}
      </div>

      <ErrorNotification error={error} />
    </div>
  );
};
