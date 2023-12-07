/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { TodoItem } from './components/Todo';
import { Footer } from './components/Footer';

const USER_ID = 11396;

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const filterTodos = (todos: Todo[], filter: FilterType) => {
  return todos.filter(todo => {
    switch (filter) {
      case FilterType.All:
        return true;

      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
};

type SetErrorMessageType = React.Dispatch<React.SetStateAction<string | null>>;
type MessageType = string;

const handleErrorMessage = (
  setErrorMessage: SetErrorMessageType,
  message: MessageType,
) => {
  setErrorMessage(message);
  setTimeout(() => {
    setErrorMessage(null);
  }, 3000);
};

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FilterType.All,
  );

  const [isEditing, setIsEditing] = useState<Record<number, boolean>>({});

  const toggleEditing = (id: number) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [id]: !prevIsEditing[id],
    }));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch (error) {
        if (error instanceof Error) {
          handleErrorMessage(
            setErrorMessage,
            error.message || Errors.Load,
          );
        } else {
          handleErrorMessage(setErrorMessage, Errors.Load);
        }
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = filterTodos(todos, currentFilter);

  const uncompletedCount = todos.filter((todo: Todo) => !todo.completed)
    .length;

  const allTodosAreActive = todos.every((todo: Todo) => !todo.completed);

  const shouldShowFooter
    = todos.length > 0
    && (currentFilter === FilterType.All
      || (currentFilter === FilterType.Active && uncompletedCount > 0)
      || (currentFilter === FilterType.Completed
        && uncompletedCount < todos.length)
      || allTodosAreActive);

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {filteredTodos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {filteredTodos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={isEditing[todo.id]}
                toggleEditing={() => toggleEditing(todo.id)}
              />
            ))}
          </section>
        )}
        {shouldShowFooter && (
          <Footer
            uncompletedCount={uncompletedCount}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            allTodosAreActive={allTodosAreActive}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorMessage ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
