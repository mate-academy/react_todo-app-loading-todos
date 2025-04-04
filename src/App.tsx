/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [isLoadingId, setIsLoadingId] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setError('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(text.unableToLoadTodos);
        const timer = setTimeout(() => setError(''), 3000);

        return () => clearTimeout(timer);
      });
  }, []);

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

  const handleLoading = (id: number | null) => {
    setIsLoadingId(prev => {
      if (id === null) {
        return {};
      }

      const newState = { ...prev };

      if (newState[id]) {
        delete newState[id];
      } else {
        newState[id] = true;
      }

      return newState;
    });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">{text.todos}</h1>
      <HeaderComponent
        todos={todos}
        setTodos={setTodos}
        handleLoading={handleLoading}
        setError={setError}
      />

      <div className="todoapp__content">
        <TodoListComponent
          isLoadingId={isLoadingId}
          handleLoading={handleLoading}
          todos={filteredByStatus}
          setTodos={setTodos}
          setError={setError}
        />
        <FooterComponent
          setError={setError}
          handleLoading={handleLoading}
          isLoadingId={isLoadingId}
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
