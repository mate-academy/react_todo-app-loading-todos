import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import Footer from './components/Footer/Footer';
// eslint-disable-next-line max-len
import ErrorNotification from './components/ErrorNotification/ErrorNotification';
import { TodoErrors } from './types/Error';
import { Filter } from './types/Filter';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<TodoErrors | null>(null);

  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  useEffect(() => {
    const fetchTodos = async () => {
      setErrorMessage(null);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage(TodoErrors.UNABLE_TO_LOAD);
      } finally {
      }
    };

    fetchTodos();
  }, []);

  const handleClearErrorNotification = () => {
    setErrorMessage(null);
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const filteredTodos = useMemo(
    () =>
      todos.filter(todo => {
        switch (filter) {
          case Filter.ACTIVE:
            return !todo.completed;
          case Filter.COMPLETED:
            return todo.completed;
          case Filter.ALL:
          default:
            return true;
        }
      }),
    [todos, filter],
  );

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
            className={cn('todoapp__toggle-all', { active: allCompleted })}
            data-cy="ToggleAllButton"
          />
          <TodoForm onError={setErrorMessage} onAddTodo={() => {}} />
        </header>
        {todos.length > 0 && <TodoList todos={filteredTodos} />}
        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} onChangeFilter={setFilter} />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        onClear={handleClearErrorNotification}
      />
    </div>
  );
};
