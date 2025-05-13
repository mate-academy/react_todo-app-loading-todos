/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { MessageError } from './components/MessageError';

/* Import componenst */

import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const [theError, setTheError] = useState<string>('');

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    getTodos(2881)
      .then(response => {
        setTodos(response);
      })
      .catch(() => {
        setHasError(true);
        setTheError('Unable to load todos');

        timer = setTimeout(() => {
          setHasError(false);
        }, 3000);
      });

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={todos} visibleTodos={visibleTodos} />

        <Footer setFilter={setFilter} filter={filter} todos={todos} />
      </div>

      <MessageError
        setHasError={setHasError}
        hasError={hasError}
        theError={theError}
      />
    </div>
  );
};
