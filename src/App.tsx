/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export enum Errors {
  Load = 'Unable to load todos',
  Title = 'Title should not be empty',
  UnableTodo = 'Unable to add a todo',
  UnableDelete = 'Unable to delete a todo',
  UnableUpdate = 'Unable to update a todo',
}

export const filterOptions = [
  { id: 'all', title: Filter.All, href: '#/' },
  { id: 'active', title: Filter.Active, href: '#/active' },
  { id: 'completed', title: Filter.Completed, href: '#/completed' },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | string>('');
  const [filterStatus, setFilterStatus] = useState(Filter.All);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        setErrorMessage(Errors.Load);

        setTimeout(() => setErrorMessage(''), 3000);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case Filter.Active:
        return todos.filter(todo => {
          return todo.completed === false;
        });
      case Filter.Completed:
        return todos.filter(todo => {
          return todo.completed === true;
        });
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList visibleTodos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
