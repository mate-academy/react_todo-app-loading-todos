/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, addTodo, deleteTodo } from './api/todos';

import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { TodoList } from './сomponents/TodoList';
import { Footer } from './сomponents/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const checkComplete = todos.length > 0 && todos.every(todo => todo.completed);

  const handlefilteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handletoggleStatus = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = useCallback(
    async (todoId: number) => {
      try {
        setLoading(true);
        await deleteTodo(todoId);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
      } catch {
        setError("Can't delete todo");
        setTimeout(() => setError(''), 3000);
      } finally {
        setLoading(false);
      }
    },
    [setTodos],
  );

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }

    try {
      setLoading(true);
      const newTodo = await addTodo(newTitle);

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setNewTitle('');
    } catch {
      setError('Unable to add todo');
    } finally {
      setLoading(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handletoggleAll = () => {
    const shouldCompleteAll = !checkComplete;

    setTodos(todos.map(todo => ({ ...todo, completed: shouldCompleteAll })));
  };

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const todosFromApi = await getTodos();

        setTodos(todosFromApi);
      } catch {
        setError('Unable to load todos');
      } finally {
        setLoading(false);
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
            className={`todoapp__toggle-all ${checkComplete ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={handletoggleAll}
          />

          <form onSubmit={handleAddTodo}>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {loading ? (
          <div data-cy="TodoLoader" className="spinner">
            Loading...
          </div>
        ) : (
          <>
            <TodoList
              todos={handlefilteredTodos}
              onToggleTodo={handletoggleStatus}
              onDelete={handleDeleteTodo}
            />
            {todos.length > 0 && (
              <Footer
                todos={todos}
                filter={filter}
                setFilter={setFilter}
                handleClearCompleted={handleClearCompleted}
                loading={loading}
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
