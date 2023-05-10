import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import { HeaderTodoApp } from './components/HeaderTodoApp';
import { MainTodoApp } from './components/MainTodoApp';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FooterTodoApp } from './components/FooterTodoApp';
import { Category } from './types/Category';

const USER_ID = 10299;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [category, setCategory] = useState<Category>('all');

  const loadTodos = async () => {
    const todosFromServer = await getTodos(USER_ID);

    setTodos(todosFromServer);
  };

  loadTodos();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodoApp
          todos={todos}
          USER_ID={USER_ID}
        />
        {todos.length > 0 && (
          <MainTodoApp
            todos={todos}
            category={category}
          />
        )}
        {todos.length > 0 && (
          <FooterTodoApp
            category={category}
            setCategory={setCategory}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {false && (
        <div className="notification is-danger is-light has-text-weight-normal">
          {/* eslint-disable jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            // onClick={() => }
          />

          {/* show only one message at a time */}
          {false && 'Unable to add a todo'}
          {false && 'Unable to delete a todo'}
          {false && 'Unable to update a todo'}
        </div>
      )}
    </div>
  );
};
