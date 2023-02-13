/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { createTodo, getTodo, getTodos } from './api/todos';
import { TodoError } from './components/TodoError';
import { Header } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6245;

enum ErrorMessage {
  onLoad = 'Unable to load todos',
  OnAdd = 'Unable to add todos',
  onDelete = 'Unable to delete todos',
  onUpdate = 'Unable to update todos',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError(true);
        setErrorMsg(ErrorMessage.onLoad);

        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    if (todo) {
      getTodo(todo.id)
        .then(setTodo);
    }
  }, [todo]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    createTodo(todoData)
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(() => setErrorMsg(ErrorMessage.OnAdd));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({
      title: newTodoTitle,
      completed: false,
      userId: USER_ID,
    });

    setNewTodoTitle('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onSubmit={handleSubmit}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
        />

        <TodoMain
          todos={todos}
        />

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a href="#/" className="filter__link selected">
              All
            </a>

            <a href="#/active" className="filter__link">
              Active
            </a>

            <a href="#/completed" className="filter__link">
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {error && (
        <TodoError
          error={error}
          errorMsg={errorMsg}
          setError={setError}
        />
      )}
    </div>
  );
};
