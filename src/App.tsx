/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusTodo, setStatusTodo] = useState('all');

  const hasCompletedTodos = todos.some(
    todoCompleted => todoCompleted.completed,
  );

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todoV =>
        todoV.id === id ? { ...todoV, completed: !todoV.completed } : todoV,
      ),
    );
  };

  const filteredTodos = todos.filter(todo => {
    return (
      statusTodo === 'all' ||
      (statusTodo === 'active' && !todo.completed) ||
      (statusTodo === 'completed' && todo.completed)
    );
  });

  const activeTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} hasCompletedTodos={hasCompletedTodos} />
        <TodoList filteredTodos={filteredTodos} toggleTodo={toggleTodo} />
        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos.length}
            statusTodo={statusTodo}
            setStatusTodo={setStatusTodo}
          />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={() => setErrorMessage('')}
      />
    </div>
  );
};
