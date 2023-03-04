/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorMsg } from './Components/ErrorMsg';
import { FilterFooter } from './Components/FilterFooter';
import { Header } from './Components/Header';
import { Todos } from './Components/Todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6502;

export const App: React.FC = () => {
  const [error] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(USER_ID).then((data) => setTodos(data));
  }, []);

  useEffect(() => {
    getTodos(USER_ID).then((data) => setFilterTodo(data));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Todos filterTodo={filterTodo} />
        {/* Hide the footer if there are no todos */}
        <FilterFooter
          setFilterTodo={setFilterTodo}
          todos={todos}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && <ErrorMsg />}
    </div>
  );
};
