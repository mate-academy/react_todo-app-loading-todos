import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';

export enum Filter {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}
export type FilterValue = `${Filter}`;

// Use the enum in helpers
const filterTodos = (initialTodos: Todo[], filter: FilterValue): Todo[] => {
  switch (filter) {
    case Filter.Completed:
      return initialTodos.filter(todo => todo.completed === true);
    case Filter.Active:
      return initialTodos.filter(todo => todo.completed === false);
    case Filter.All:
    default:
      return initialTodos;
  }
};

const countActive = (todos: Todo[]) =>
  todos.filter(todo => todo.completed === false).length;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterValue>(Filter.All);
  const [updatingTodoIds, setUpdatingTodoIds] = useState<number[]>([]);
  const [activeCount, setActiveCount] = useState<number>();
  const USER_ID = 3205;

  useEffect(() => {
    todoService
      .getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setActiveCount(countActive(todosFromServer));
      })
      .catch(() => {
        setError('Unable to load todos');
        new Error('Unable to load todos');
      });
  }, []);

  const filteredTodos = filterTodos(todos, filter);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const tempId = maxId + 1;

    setTodos(prev => [...prev, { ...newTodo, id: tempId }]);
    setUpdatingTodoIds([tempId]);

    return todoService
      .addTodo(newTodo)
      .then(addedTodo => {
        setTodos(prev => {
          const updated = prev.map(todo =>
            todo.id === tempId ? addedTodo : todo,
          );
          setActiveCount(countActive(updated));
          return updated;
        });
        setQuery('');
      })
      .catch(() => {
        setTodos(todos);
        setError('Unable to add a todo');
      })
      .finally(() => setUpdatingTodoIds([]));
  };

  const deleteTodo = (todoId: number) => {
    setUpdatingTodoIds([todoId]);

    return todoService
      .deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos => {
          const updated = currentTodos.filter(todo => todo.id !== todoId);
          setActiveCount(countActive(updated));
          return updated;
        });
      })
      .catch(() => setError('Unable to delete a todo'))
      .finally(() => setUpdatingTodoIds([]));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setUpdatingTodoIds(prev => [...prev, updatedTodo.id]);

    return todoService
      .updateTodo(updatedTodo)
      .then(newTodo => {
        setTodos(currentTodos => {
          const newTodos = [...currentTodos];
          const index = newTodos.findIndex(t => t.id === updatedTodo.id);
          if (index !== -1) newTodos.splice(index, 1, newTodo);
          setActiveCount(countActive(newTodos));
          return newTodos;
        });
      })
      .catch(() => {
        setError('Unable to update a todo');
        throw new Error('Unable to update a todo');
      })
      .finally(() =>
        setUpdatingTodoIds(prev => prev.filter(id => id !== updatedTodo.id)),
      );
  };

  const handleSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    if (query.trim().length === 0) {
      setError('Title should not be empty');
      return;
    }

    const newTodo = {
      title: query.trim(),
      userId: USER_ID,
      completed: false,
    };

    addTodo(newTodo);
  };

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) deleteTodo(todo.id);
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          updatingTodoIds={updatingTodoIds}
          setQuery={setQuery}
          todos={todos}
          handleSubmit={handleSubmit}
          updateTodo={updateTodo}
        />

        {todos && (
          <TodoList
            todos={filteredTodos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            updatingTodoIds={updatingTodoIds}
          />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            count={activeCount}
            filter={filter}
            setFilter={setFilter}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error}
      </div>
    </div>
  );
};
