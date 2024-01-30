/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { Header } from './components/Header/Header';
import { Section } from './components/Section/Section';
import { Footer } from './components/Footer/Footer';
import { TodosContext } from './components/Store/Store';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const [hasTiteErrorMessage, setHasTileErrorMessage] = useState(false);

  useEffect(() => {
    if (hasTiteErrorMessage) {
      setTimeout(() => {
        setHasTileErrorMessage(false);
      }, 3000);
    }
  }, [hasTiteErrorMessage]);

  return (
    <div className={cn('todoapp', { 'has-error': hasTiteErrorMessage })}>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setHasTileErrorMessage={(arg) => setHasTileErrorMessage(arg)} />
        <Section />
        {todos.length > 0 && (<Footer />)}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !hasTiteErrorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasTileErrorMessage(false)}
        />
        {hasTiteErrorMessage && (
          <span>Title should not be empty</span>
        )}
        {/* Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
      </div>
    </div>
  );
};
