import React, { useContext, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer/Footer';
import { Notification } from './components/Notification';

import { client } from './utils/fetchClient';
import { USER_ID } from './constants/user';
import { Todo } from './types/Todo';
import { DispatchContext, StateContext } from './State/State';
import { getPreparedTodos } from './services/todosServices';

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const dispatch = useContext(DispatchContext);
  const { updatedAt, filterBy, setAllCompleted } = useContext(StateContext);

  const preparedTodos = getPreparedTodos(todos, filterBy);

  function pressKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      dispatch({ type: 'setEscape', payload: true });
    }
  }

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(res => {
        setTodo(res);
        dispatch({ type: 'saveTodos', payload: res });
      })
      .catch(() => dispatch(
        { type: 'setError', payload: 'Unable to load todos' },
      ));
  }, [updatedAt, dispatch, setAllCompleted]);

  useEffect(() => {
    document.addEventListener('keyup', pressKey);

    return () => {
      document.removeEventListener('keyup', pressKey);
    };
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <main>
          <TodoList todos={preparedTodos} />
        </main>

        {!!todos.length && <Footer />}
      </div>

      <Notification />
    </div>
  );
};
