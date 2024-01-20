import { useContext } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Main } from '../Main';

import { Context } from '../../Context';

export const TodoApp = () => {
  const { todos } = useContext(Context);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <div>
            <Main />
            <Footer />
          </div>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
