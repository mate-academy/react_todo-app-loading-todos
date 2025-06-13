import React from 'react';
import { AddNewTodo } from '../../utils/AddNewTodo';

type Props = {
  onTodoAdded: (title: string) => void;
  isLoading: boolean;
};

export const Header: React.FC<Props> = ({ onTodoAdded, isLoading }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />
      <AddNewTodo onTodoAdded={onTodoAdded} isLoading={isLoading} />
    </header>
  );
};
