/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, addTodo, deleteTodo } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer/Footer';

export enum FilterOptions {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.All,
  );
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const toggleTodoCompletion = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterOption) {
      case FilterOptions.Active:
        return !todo.completed;
      case FilterOptions.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      const newTodo = await addTodo(newTodoTitle);

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setNewTodoTitle('');
    } catch {
      setError('Unable to add todo');
    } finally {
      setIsLoading(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = useCallback(
    async (todoId: number) => {
      try {
        setIsLoading(true);
        await deleteTodo(todoId);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
      } catch {
        setError("Can't delete todo");
        setTimeout(() => setError(''), 3000);
      } finally {
        setIsLoading(false);
      }
    },
    [setTodos],
  );

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const shouldCompleteAll = !allCompleted;

    setTodos(todos.map(todo => ({ ...todo, completed: shouldCompleteAll })));
  };

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const todosFromApi = await getTodos();

        setTodos(todosFromApi);
      } catch {
        setError('Unable to load todos');
      } finally {
        setIsLoading(false);
        setTimeout(() => setError(''), 3000);
      }
    };

    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />

          <form onSubmit={handleAddTodo}>
            <input
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {isLoading ? (
          <div data-cy="TodoLoader" className="spinner">
            Loading...
          </div>
        ) : (
          <>
            <TodoList
              todos={filteredTodos}
              onToggleTodo={toggleTodoCompletion}
              onDelete={handleDelete}
            />
            {todos.length > 0 && (
              <Footer
                todos={todos}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                handleClearCompleted={handleClearCompleted}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
