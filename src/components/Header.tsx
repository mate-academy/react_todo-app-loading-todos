/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  inputText: string,
  setInputText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
};

export const Header: React.FC<Props> = ({
  inputText,
  setInputText,
  handleKeyPress,
  handleKeyUp,
}) => (
  <header className="todoapp__header">
    {/* this buttons is active only if there are some active todos */}
    <button type="button" className="todoapp__toggle-all active" />

    {/* Add a todo on form submit */}
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={inputText}
        onChange={setInputText}
        onKeyDown={handleKeyPress}
        onKeyUp={handleKeyUp}
      />
    </form>
  </header>
);
