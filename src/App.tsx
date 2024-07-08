/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { useDispatch } from './GlobalStateProvider';
import { Type } from './types/Action';
import { ErrorNotifications } from './components/ErrorNotifications';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  // const { loading } = useGlobalState();
  const dispatch = useDispatch();

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    dispatch({ type: Type.setLoading, payload: true });

    getTodos()
      .then(response => dispatch({ type: Type.setTodos, payload: response }))
      .catch(() => {
        dispatch({
          type: Type.setErrorMessage,
          payload: 'Unable to load todos',
        });

        setTimeout(
          () => dispatch({ type: Type.setErrorMessage, payload: '' }),
          3000,
        );
      })
      .finally(() => dispatch({ type: Type.setLoading, payload: false }));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        <Footer />
      </div>
      <ErrorNotifications />
    </div>
  );
};
