/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, addData, deleteData, updateTodoStatus } from './api/todos';
import { getTodos, deleteData as deleteTodo } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { SortField } from './types/SortTypes';
import { SortButtons } from './components/SortButtons';

export const App: React.FC = () => {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [sortField, setSortField] = useState<SortField>(SortField.All);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updatedTodoId, setUpdatedTodoId] = useState<number | null>(null);
  const [isAddingTodo, setIsAddingTodo] = useState<boolean>(false); // New state for adding todo

  useEffect(() => {
    const fetchTodos = async () => {
      setErrorMessage(null);
      setIsNotificationVisible(false);

      try {
        setIsTimerActive(true);
        const todos = await getTodos();

        setVisibleTodos(todos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
        setIsNotificationVisible(true);

        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000);
      } finally {
        setIsTimerActive(false);
      }
    };

    fetchTodos();
    inputRef.current?.focus();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const changeStatus = async (id: number, completed: boolean) => {
    setUpdatedTodoId(id);
    try {
      await updateTodoStatus(id, completed);
      setVisibleTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
      );
    } catch (error) {
      setErrorMessage('Unable to update a todo.');
      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 3000);
    } finally {
      setUpdatedTodoId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setUpdatedTodoId(id);
    try {
      await deleteTodo(id);
      setVisibleTodos(todos => todos.filter(todo => todo.id !== id));
    } catch (error) {
      setErrorMessage('Unable to delete a todo.');
      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 3000);
    } finally {
      setUpdatedTodoId(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle.trim()) {
      setIsAddingTodo(true);
      try {
        const newTodo = await addData(newTodoTitle);

        setVisibleTodos(todos => [...todos, newTodo]);
        setNewTodoTitle('');
      } catch (error) {
        setErrorMessage('Unable to add a todo.');
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000);
      } finally {
        setIsAddingTodo(false);
      }
    }
  };

  const sortTodos = (field: SortField) => {
    setSortField(field);
  };

  const getSortedTodos = () => {
    switch (sortField) {
      case SortField.All:
        return visibleTodos;
      case SortField.Active:
        return visibleTodos.filter(todo => !todo.completed);
      case SortField.Completed:
        return visibleTodos.filter(todo => todo.completed);
      default:
        return visibleTodos;
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = visibleTodos.filter(todo => todo.completed);

      await Promise.all(completedTodos.map(todo => deleteData(todo.id)));
      setVisibleTodos(todos => todos.filter(todo => !todo.completed));
    } catch (error) {
      setErrorMessage('Unable to clear completed todos.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={getSortedTodos()}
            deleteTodo={handleDelete}
            isLoaderVisible={isAddingTodo || isTimerActive}
            onStatusChange={changeStatus}
            isCompleted={visibleTodos.some(todo => todo.completed)}
            updatedTodoId={updatedTodoId}
          />
        </section>

        {visibleTodos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {getSortedTodos().length} items left
            </span>
            <nav className="filter" data-cy="Filter">
              <SortButtons sortBy={sortTodos} currentSortField={sortField} />
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${isNotificationVisible ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsNotificationVisible(false)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
