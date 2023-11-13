import React from 'react';
import { Todo } from '../types/Todo';
import { TodoForm } from './todoForm/TodoForm';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  onAdd: (val: Todo) => void,
  setIsVisible: (val: boolean) => void
};

export const Header: React.FC<Props> = ({ onAdd, setIsVisible }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <TodoForm onAdd={onAdd} setIsVisible={setIsVisible} />
    </header>
  );
};
