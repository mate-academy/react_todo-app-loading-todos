import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Errors } from './components/errors/errors';
import { Footer } from './components/footer/footer';
import { ToDoList } from './components/todoList/todoList';
import { Header } from './components/header/header';
import { Todo } from './types/Todo';
import { TodoStatus } from './enums/TodoStatus';
import { filterTodos } from './utils/todoHelpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.All);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => handleError('Unable to load todos'));
  }, []);

  const handleToggle = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const filteredTodos = filterTodos(todos, status);
  const leftItems = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <ToDoList
          list={filteredTodos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />

        {todos.length > 0 && (
          <Footer onClick={setStatus} status={status} leftItems={leftItems} />
        )}
      </div>

      <Errors errorMessage={errorMessage} onClose={setErrorMessage} />
    </div>
  );
};
