/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { Header } from './Components/Header';
import { TodoList } from './Components/Todolist';
import { Footer } from './Components/Footer';
import { getTodos } from './api/todos';
import { Notification } from './Components/Notification';

const USER_ID = 6376;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState<Todo[]>(todos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasErrorFromServer, setHasErrorFromServer] = useState(false);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
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

    setTodosToShow(filteredTodos);
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
          todosToShow={todosToShow}
        />
        {todos.length > 0 && (
          <Footer
            todosToShow={todosToShow}
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
