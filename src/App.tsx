/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { FilterState } from './types/FilterState';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.Default);
  const [activeFilter, setActiveFilter] = useState(FilterState.All);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const filteredTodos = getFilteredTodos(todos, activeFilter);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.LoadTodo));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizeTitle = title.trim();

    if (!normalizeTitle) {
      setErrorMessage(ErrorMessage.EmptyTitle);

      return;
    }

    try {
      addTodo({ userId: USER_ID, completed: false, title });
    } catch (error) {
      setErrorMessage(ErrorMessage.AddTodo);
    } finally {
      setTitle('');
      setErrorMessage(ErrorMessage.Default);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header title={title} setTitle={setTitle} handleSubmit={handleSubmit} />

        <TodoList todos={filteredTodos} />

        {todos.length && (
          <Footer
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        )}
      </div>

      <ErrorNotification message={errorMessage} setMessage={setErrorMessage} />
    </div>
  );
};
