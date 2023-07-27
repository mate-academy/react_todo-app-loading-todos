/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11141;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <Form todos={filteredTodos} />
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length !== 0
          && (
            <Footer
              todos={todos}
              setTodos={setFilteredTodos}
            />
          )}
      </div>

      <Notifications />
    </div>
  );
};
