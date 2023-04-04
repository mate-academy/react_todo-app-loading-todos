/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './Components/Header';
import { TodoList } from './Components/Todolist';
import { Footer } from './Components/Footer';
import { Notification } from './Components/Notification';

const USER_ID = 6342;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasErrorFromServer, setHasErrorFromServer] = useState(false);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (selectedStatus) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [selectedStatus, todos]);

  const fetchTodos = async () => {
    try {
      setHasErrorFromServer(false);
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasErrorFromServer(true);
      setErrorMessage('upload');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TodoList
          todosToShow={filteredTodos}
        />
        {todos.length > 0 && (
          <Footer
            todosToShow={filteredTodos}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        )}
      </div>
      <Notification
        hasErrorFromServer={hasErrorFromServer}
        setHasErrorFromServer={setHasErrorFromServer}
        errorMessage={errorMessage}
      />
    </div>
  );
};
