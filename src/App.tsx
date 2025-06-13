/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { getTodos, addTodo, deleteTodo, updateTodo } from './api/todos';
import classNames from 'classnames';

export type Filter = 'all' | 'active' | 'completed';

export const TodoErrors = {
  Unknown: 'Something when wrong',
  UnableToLoad: 'Unable to load todos',
  TitleShouldNotBeEmpty: 'Title should not be empty',
  UnableToAddTodo: 'Unable to add a todo',
  UnableToDeleteTodo: 'Unable to delete a todo',
  UnableToUpdateTodo: 'Unable to update a todo',
} as const;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  // перша загрузка Todo
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(TodoErrors.UnableToLoad);
        setShowError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  //таймер помилки
  useEffect(() => {
    if (showError && error) {
      const timer = setTimeout(() => {
        setShowError(false);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [showError, error]);

  //додаємо та валідуємо Todo
  const handleTodoAdded = async (title: string) => {
    if (!title.trim()) {
      setError(TodoErrors.TitleShouldNotBeEmpty);
      setShowError(true);

      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newTodo = await addTodo(title.trim());

      setTodos(prev => [newTodo, ...prev]);
    } catch {
      setError(TodoErrors.UnableToAddTodo);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  //видаляємо та валідуємо
  const handleTodoDeleted = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setError(TodoErrors.UnableToDeleteTodo);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  //змінюємо статус та валідуємо
  const handleToggleCompleted = async (todo: Todo) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTodo = await updateTodo(todo.id, {
        ...todo,
        completed: !todo.completed,
      });

      setTodos(prev => prev.map(t => (t.id === todo.id ? updatedTodo : t)));
    } catch {
      setError(TodoErrors.UnableToUpdateTodo);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  //фільтрація todo на зроблені і ні
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return todo;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header onTodoAdded={handleTodoAdded} isLoading={isLoading} />
        <Body
          todos={filteredTodos}
          handleTodoDeleted={handleTodoDeleted}
          isLoading={isLoading}
          handleToggleCompleted={handleToggleCompleted}
        />
        {todos.length > 0 && (
          <Footer
            counterValue={todos.filter(todo => !todo.completed).length}
            filter={filter}
            setFilter={setFilter}
            todos={todos}
            isLoading={isLoading}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: error === null },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setShowError(false);
            setError(null);
          }}
        />
        {error}
      </div>
    </div>
  );
};
