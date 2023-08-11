import React, { useContext, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { HeaderComponent } from './components/HeaderComponent';
import { NotificationComponent } from './components/NotificationComponent';
import { MainComponent } from './components/MainComponent';
import { USER_ID } from './utils/const';
import { FooterComponent } from './components/FooterComponent';
import { AppContext } from './context';
import { Types } from './reducer';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { errorMessage } = state;

  useEffect(() => {
    getTodos(USER_ID).then(todos => {
      dispatch({
        type: Types.SetTodosToState,
        payload: {
          todos,
        },
      });
    });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <HeaderComponent />
        <MainComponent />

        {state.todos.length !== 0 && (
          <FooterComponent />
        )}

      </div>

      {errorMessage && (
        <NotificationComponent />
      )}
    </div>
  );
};
