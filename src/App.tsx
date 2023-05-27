/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/footer_filter/footer_filter';
import { Header } from './components/header_filter/header_filter';
import { Main } from './components/main_todos-list/main_todos-list';

const USER_ID = 10548;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('all');

  async function loadedTodos(f: (USER_ID: number) => Promise<Todo[]>) {
    const result = await f(USER_ID);

    setTodos(result);
  }

  useEffect(() => {
    loadedTodos(getTodos);
  }, []);

  const handleChangeInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleStatus = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    setStatus(event.currentTarget.type);
  };

  let visibleTodos = todos.filter((todo) => (todo.title.includes(input)));

  visibleTodos = visibleTodos.filter((todo) => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return !!todo.completed;

      case 'all':
      default:
        return todo;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const itemsLeftCount = visibleTodos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          countActiveTodo={itemsLeftCount}
          inputValue={input}
          onHandleInput={handleChangeInput}
        />

        <Main visibleTodos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        <Footer
          selectedStatus={status}
          onHandleStatus={handleStatus}
          itemsLeftCount={itemsLeftCount}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
