/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filter, setFilter] = React.useState<FilterType>('all');
  const [title, setTitle] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [tempTodo, setTempTodo] = React.useState<Todo | null>(null);
  const [loadingTodos, setLoadingTodos] = React.useState<number[]>([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1) as FilterType;
    const validFilters = ['all', 'active', 'completed'];

    if (validFilters.includes(hash)) {
      setFilter(hash);
    } else {
      setFilter('all');
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: 0,
      title: title.trim(),
      completed: false,
      userId: USER_ID,
    };

    setTempTodo(newTodo);
    setTitle('');

    try {
      const addedTodo = await addTodo(title.trim());

      setTodos(prev => [...prev, addedTodo]);
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      setTitle(newTodo.title);
    } finally {
      setTempTodo(null);
    }
  };

  const handleDelete = async (todoId: number) => {
    setLoadingTodos(prev => [...prev, todoId]);

    try {
      await deleteTodo(todoId);
      setTodos(prev => prev.filter(todo => todo.id !== todoId));
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(id => id !== todoId));
    }
  };

  const handleToggle = async (todoId: number) => {
    setLoadingTodos(prev => [...prev, todoId]);

    try {
      const todo = todos.find(t => t.id === todoId);

      if (todo) {
        const updatedTodo = await updateTodo(todoId, {
          ...todo,
          completed: !todo.completed,
        });

        setTodos(prev => prev.map(t => (t.id === todoId ? updatedTodo : t)));
      }
    } catch (error) {
      setErrorMessage('Unable to update a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(id => id !== todoId));
    }
  };

  const handleUpdate = async (todoId: number, newTitle: string) => {
    setLoadingTodos(prev => [...prev, todoId]);

    try {
      const todo = todos.find(t => t.id === todoId);

      if (todo) {
        const updatedTodo = await updateTodo(todoId, {
          ...todo,
          title: newTitle,
        });

        setTodos(prev => prev.map(t => (t.id === todoId ? updatedTodo : t)));
      }
    } catch (error) {
      setErrorMessage('Unable to update a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(id => id !== todoId));
    }
  };

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    setLoadingTodos(completedTodos.map(todo => todo.id));

    try {
      await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      setErrorMessage('Unable to delete completed todos');
    } finally {
      setLoadingTodos([]);
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm
          title={title}
          isLoading={isLoading}
          onTitleChange={setTitle}
          onSubmit={handleSubmit}
        />

        <TodoList
          todos={filteredTodos}
          tempTodo={tempTodo}
          loadingTodos={loadingTodos}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} items left`}
            </span>

            <TodoFilter filter={filter} onFilterChange={setFilter} />

            {completedTodosCount > 0 && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={handleClearCompleted}
                disabled={loadingTodos.length > 0}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
