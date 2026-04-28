/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, deleteTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todoStatus, setTodoStatus] = useState<boolean | null>(null);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setError('Title should not be empty');

      return;
    }

    addTodo({ title, completed: false, userId: USER_ID })
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setTitle('');
      })
      .catch(() => setError('Unable to add a todo'));
  };

  const handleDeleteTodo = (todoId: number) => {
    setLoadingIds(prev => [...prev, todoId]);

    deleteTodo(todoId)
      .then(() =>
        setTodos(currentTodos => {
          return currentTodos.filter(todo => todo.id !== todoId);
        }),
      )
      .catch(() => setError('Unable to delete a todo'))
      .finally(() => setLoadingIds(prev => prev.filter(id => id !== todoId)));
  };

  const filteredTodos = todos.filter(todo => {
    if (todoStatus === null) {
      return true;
    }

    return todo.completed === todoStatus;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

        {todos.length > 0 && (
          <TodoList
            filteredTodos={filteredTodos}
            loadingIds={loadingIds}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
          />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
