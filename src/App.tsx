import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { Notification } from './Components/Notification';

const USER_ID = 7011;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.All);
  const [isError, setIsError] = useState(false);

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (selectedStatus) {
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [selectedStatus, todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
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
          title={title}
          setTitle={handleNewTitle}
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
      {isError
        && <Notification />}
    </div>
  );
};
