/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [searchQuery, setSearchQuery] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [selectFilterStatus, setSelectFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setIsErrorVisible(true));
  }, []);

  useEffect(() => {
    const newFilteredTodos = todos.filter(todo => {
      switch (selectFilterStatus) {
        case FilterStatus.Active:
          return !todo.completed;
        case FilterStatus.Completed:
          return todo.completed;
        default:
          return true;
      }
    });

    setFilteredTodos(newFilteredTodos);
  }, [selectFilterStatus, todos]);

  useEffect(() => {
    if (isErrorVisible) {
      const timer = setTimeout(() => {
        setIsErrorVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isErrorVisible]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            setTodos={setTodos}
            selectedStatus={selectFilterStatus}
            setSelectedStatus={setSelectFilterStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        isErrorVisible={isErrorVisible}
        closeError={setIsErrorVisible}
      />
    </div>
  );
};
