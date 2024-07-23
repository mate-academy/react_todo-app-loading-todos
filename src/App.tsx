import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Actions } from './types/Actions';
import { HeaderTodos } from './components/HeaderTodos';
import { ListOfTodos } from './components/ListOfTodos';
import { FooterTodos } from './components/FooterTodos';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(true);
  const [filterActions, setFilterActions] = useState<Actions>(Actions.ALL);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setShowNotification(false);
        setError('Unable to load todos');
        timeoutId.current = window.setTimeout(() => {
          setShowNotification(true);
        }, 3000);
      });

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const checkCompleted = todos?.every(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodos checkCompleted={checkCompleted} />

        <ListOfTodos todos={todos} actions={filterActions} />

        <FooterTodos todos={todos} handleAction={setFilterActions} />
      </div>

      <ErrorNotification
        showNotification={showNotification}
        errorMessage={error}
        deleteNotification={setShowNotification}
      />
    </div>
  );
};
