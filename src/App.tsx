import React, { useContext, useEffect } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Error } from './components/Error';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { DispatchContext, StateContext } from './store/TodoContext';

import { ActionType } from './types/Actions';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        return dispatch({
          type: ActionType.SetTodos,
          payload: todosFromServer,
        });
      })
      .catch(error => {
        dispatch({
          type: ActionType.SetErrorMessage,
          payload: `Loading error: ${error}`,
        });

        setTimeout(() => {
          dispatch({ type: ActionType.SetErrorMessage, payload: '' });
        }, 3000);
      });
  }, [dispatch]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />

        {todos.length > 0 && <Footer />}
        <Error />
      </div>
    </div>
  );
};
