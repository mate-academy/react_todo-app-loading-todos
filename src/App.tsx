/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorsManager } from './components/ErrorsManager/ErrorsManager';
import { NewTodo } from './components/NewTodo/NewTodo';

export enum Filters {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

export enum Errors {
  load = 'Unable to load todos',
  empty = 'Title should not be empty',
  add = 'Unable to add a todo',
  delete = 'Unable to delete a todo',
  update = 'Unable to update a todo',
  default = 'No errors',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Errors>(Errors.default);
  const [filter, setFilter] = useState<Filters>(Filters.all);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setError(Errors.load))
      .finally(() => setIsLoading(false));
  }, []);

  const handleErrorHide = () => {
    setError(Errors.default);
  };

  useEffect(() => {
    if (error !== Errors.default) {
      setTimeout(() => {
        handleErrorHide();
      }, 3000);
    }
  }, [error]);

  const filteredTodos = useMemo(
    () =>
      todos
        .filter(todo => {
          // eslint-disable-next-line prettier/prettier
          switch (filter) {
            case Filters.all:
              return todo;
            case Filters.active:
              return !todo.completed;
            case Filters.completed:
              return todo.completed;
            default:
              return todo;
          }
        })
        .filter(todo => todo.title.toLowerCase()),
    [filter, todos],
  );

  const handleAddNewTodo = (title: string) => {
    setTimeout(() => {
      const newTodo: Todo = {
        id: todos.length + 1,
        userId: 0,
        title,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }, 500);
  };

  const handleFilter = (type: Filters) => setFilter(type);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo onAddNewTodo={handleAddNewTodo} />
        {isLoading ? (
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        ) : (
          <TodoList todos={filteredTodos} />
        )}

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <Footer
            filter={filter}
            onFilterChange={handleFilter}
            todos={todos}
            filteredTodos={filteredTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorsManager error={error} errorHide={handleErrorHide} />
    </div>
  );
};
