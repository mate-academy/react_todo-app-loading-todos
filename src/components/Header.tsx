import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { ErrorValues } from '../types/ErrorValues';
import { ErrorContext } from '../context/ErrorContextProvider';

type Props = {
  countOfTodos: number,
};

export const Header: React.FC<Props> = ({ countOfTodos }) => {
  const [inputValue, setInputValue] = useState('');
  const errorContext = useContext(ErrorContext);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="button"
        className={classNames('todoapp__toggle-all',
          { active: countOfTodos > 0 })}
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (inputValue.trim().length === 0) {
            errorContext.setErrorMessage(ErrorValues.Validation);
          }
        }}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            errorContext.setHideError(true);
          }}
        />
      </form>
    </header>
  );
};
