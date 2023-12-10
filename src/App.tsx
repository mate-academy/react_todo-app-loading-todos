/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Errors } from './components/Errors';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 12003;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [error, setError] = useState('');

  const getTodoList = async () => {
    try {
      const todoList = await getTodos(USER_ID);

      setTodos(todoList);
      setFilteredTodos(todoList);
    } catch (err) {
      setError('Unable to load todos');
    }
  };

  useEffect(() => {
    setError('');
    getTodoList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {!!todos.length && (
          <Footer
            todos={todos}
            filteredTodoList={setFilteredTodos}
          />
        )}
      </div>

      {!!todos && <Errors error={error} setError={() => setError} />}
    </div>
  );
};
