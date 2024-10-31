/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { Loader } from './components/Loader/Loader';
import { Footer } from './components/footer/Footer';
import { TodoList } from './components/todo_list/todo_list';
import { FilterOptions } from './types/FilterOptions';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterOptions>(
    FilterOptions.All,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleDelete = useCallback(
    async (todoId: number) => {
      try {
        setLoading(true);
        await todoService.deleteTodos(todoId);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
      } catch {
        setErrorMessage("Can't delete todo");
      } finally {
        setLoading(false);
        setTimeout(() => setErrorMessage(''), 3000);
      }
    },
    [setTodos],
  );

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case FilterOptions.Active:
        return todos.filter(todo => !todo.completed);
      case FilterOptions.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [currentFilter, todos]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      return;
    }

    try {
      setLoading(true);
      const newTodo = await todoService.postTodo(newTodoTitle);

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setNewTodoTitle('');
    } catch {
      setErrorMessage('Unable to add todo');
    } finally {
      setLoading(false);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const completedAllTodos = () => {
    const shouldCompleteAllTodos = !allCompleted;

    setTodos(
      todos.map(todo => ({ ...todo, completed: shouldCompleteAllTodos })),
    );
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const todosFromApi = await todoService.getTodos();

        setTodos(todosFromApi);
      } catch {
        setErrorMessage('Unable to load todos');
      } finally {
        setLoading(false);
        setTimeout(() => setErrorMessage(''), 3000);
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
            onClick={completedAllTodos}
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

        {loading ? (
          <div data-cy="TodoLoader" className="spinner">
            <Loader />
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
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                handleClearCompleted={handleClearCompleted}
                loading={loading}
              />
            )}
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
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
