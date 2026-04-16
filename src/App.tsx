/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodosList } from './components/TodosList';
import { FilterStatus } from './types/FilterStatus';
import { Footer } from './components/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [error, setError] = useState('');

  const timerId = useRef(0);

  useEffect(() => {
    getTodos()
      .then(todo => {
        window.clearTimeout(timerId.current);
        setTodos(todo);
      })
      .catch(() => {
        window.clearTimeout(timerId.current);

        timerId.current = window.setTimeout(() => {
          setError('');
        }, 3000);

        setError('Unable to load todos');
      });
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    if (filter === FilterStatus.All) {
      return todos;
    }

    return todos.filter(todo =>
      filter === FilterStatus.Active ? !todo.completed : todo.completed,
    );
  }, [todos, filter]);

  const hasCompletedTodo: boolean = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const isEveryCompletedTodo: boolean = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const itemsLeft: number = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isEveryCompletedTodo={isEveryCompletedTodo} />

        <TodosList todos={filteredTodos} />

        {todos.length !== 0 && (
          <Footer
            itemsLeft={itemsLeft}
            setFilter={setFilter}
            filter={filter}
            hasCompletedTodo={hasCompletedTodo}
          />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
