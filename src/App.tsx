/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { ErrorTp } from './types/error';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Errors } from './components/Errors';
import { FilterType } from './types/FilterType';
import { Footer } from './components/Footer';

const USER_ID = 46;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState<ErrorTp | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.all);

  useEffect(() => {
    // Call getTodos with USER_ID
    getTodos(USER_ID)
      .then((currentTodos) => {
        setTodos(currentTodos);
      })
      .catch(() => setErrors(ErrorTp.load_error));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filterTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.completed:
        return todos.filter(todo => todo.completed);
      case FilterType.active:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filterType]);

  const handelChangFilter = (filter: FilterType) => {
    setFilterType(filter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filterTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterChange={handelChangFilter}
            filterType={filterType}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Errors errors={errors} />
    </div>
  );
};
