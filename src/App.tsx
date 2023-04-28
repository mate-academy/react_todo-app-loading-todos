import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { getTodos } from './api/todos';
import { StatusOfTodos } from './types/StatusOfTodos';

const USER_ID = 9944;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<StatusOfTodos>(StatusOfTodos.All);
  const [isError, setIsError] = useState(false);

  const getTodoList = async () => {
    try {
      const newTodoList = await getTodos(USER_ID);

      setTodos(newTodoList);
    } catch {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const filteredTodos = () => {
    switch (status) {
      case StatusOfTodos.Active:
        return todos.filter(todo => !todo.completed);

      case (StatusOfTodos.Completed):
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos()} />

        {todos.length > 0 && (
          <Footer
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>

      {isError && <Notification />}

    </div>
  );
};
