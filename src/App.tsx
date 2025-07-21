/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  createTodo,
  deleteTodo,
  getTodos,
  uptadeTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Todolist } from './components/TodoList';
import { Footer } from './components/Footer';

type Type = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Type>('all');
  const [loadingTodoCheck, setLoadingTodoCheck] = useState<number | null>(null);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleToggle = (todo: Todo) => {
    setLoadingTodoCheck(todo.id);

    uptadeTodo(todo.id, { completed: !todo.completed })
      .then(update => {
        setTodos(current => current.map(e => (e.id === todo.id ? update : e)));
      })
      .catch(() => showError('Unable to update a todo'))
      .finally(() => setLoadingTodoCheck(null));
  };

  const handleDelete = (id: number) => {
    deleteTodo(id)
      .then(() => {
        setTodos(current => current.filter(todo => todo.id !== id));
      })
      .catch(() => showError('Unable to delete a todo'));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTitle = title.trim();

    if (!newTitle) {
      showError('Title should not be empty');

      return;
    }

    const newTodo = {
      id: 0,
      userId: USER_ID,
      title: newTitle,
      completed: false,
    };

    setIsLoading(true);
    createTodo(newTodo)
      .then(create => {
        setTodos(current => [...current, create]);
        setTitle('');
      })
      .catch(() => showError('Unable to add a todo'))
      .finally(() => setIsLoading(false));
  };

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(() => {
        setTodos(current => current.filter(todo => !todo.completed));
      })
      .catch(() => showError('Unable to delete a todo'));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          allCompleted={allCompleted}
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          newTodoRef={newTodoRef}
          isLoading={isLoading}
        />
        <Todolist
          visibleTodos={visibleTodos}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          loadingTodoCheck={loadingTodoCheck}
        />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeTodos={activeTodos}
            setFilter={setFilter}
            filter={filter}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          error ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => showError('')}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
