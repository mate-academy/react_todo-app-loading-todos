/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer/Footer';
import { Notification } from './components/Notification';
import { client } from './utils/fetchClient';
import { USER_ID } from './constants/user';
import { Todo } from './types/Todo';
import { DispatchContext, StateContext } from './State/State';

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const { updatedAt } = useContext(StateContext);
  const distatch = useContext(DispatchContext);

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(res => {
        setTodo(res);
        distatch({ type: 'saveTodos', payload: res });
      })
      .catch(() => distatch(
        { type: 'setError', payload: 'Unable to load todos' },
      ));
  }, [updatedAt, distatch]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <main>
          <TodoList todos={todos} />
        </main>

        <Footer />
      </div>

      <Notification />
    </div>
  );
};
