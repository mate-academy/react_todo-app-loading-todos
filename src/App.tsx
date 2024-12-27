/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/todo/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/errorNotification/ErrorNotification';
// eslint-disable-next-line max-len

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMesage, setErrorMesage] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todo = await getTodos();

        setTodos(todo);
      } catch {
        setErrorMesage('Unable to load todos');
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    switch (statusFilter) {
      case 'all':
        return filtered;
      case 'active':
        return (filtered = filtered.filter(todo => !todo.completed));
      case 'completed':
        return (filtered = filtered.filter(todo => todo.completed));

      default:
        return filtered;
    }
  }, [statusFilter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <TodoList todoList={filteredTodos} />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            statusFilter={statusFilter}
            setFilterStatus={setStatusFilter}
          />
        )}
      </div>
      <ErrorNotification
        error={errorMesage}
        onClose={() => setErrorMesage('')}
      />
    </div>
  );
};
