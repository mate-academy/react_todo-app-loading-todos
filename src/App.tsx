/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { text } from './constants/text';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HeaderComponent } from './components/header/Header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [error, setError] = useState<string>('');
  const [isLoadingId, setIsLoadingId] = useState<number | null>(null);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(text.unableToLoadTodos);
        timeoutId.current = window.setTimeout(() => setError(''), 3000);
      });

    return () => {
      if (timeoutId.current !== null) {
        window.clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, []);

  console.log(todos);

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const filteredByStatus = useMemo(() => {
    return todos.filter(todo => {
      if (selectedStatus === 'completed') {
        return todo.completed;
      }

      if (selectedStatus === 'active') {
        return !todo.completed;
      }

      return true;
    });
  }, [selectedStatus, todos]);

  const closeModal = () => {
    setError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">{text.todos}</h1>
      <HeaderComponent setTodos={setTodos} setIsLoadingId={setIsLoadingId} />

      <div className="todoapp__content">
        <TodoListComponent
          isLoadingId={isLoadingId}
          setIsLoadingId={setIsLoadingId}
          todos={filteredByStatus}
          setTodos={setTodos}
          setError={setError}
        />
        <FooterComponent
          todos={todos}
          setTodos={setTodos}
          count={activeTodos.length}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>
      <NotificationComponent errorMessage={error} closeModal={closeModal} />
    </div>
  );
};
