/* eslint-disable */

import React, { useState } from 'react';
import type { Todo } from '../../types/Todo';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  onAdd : (value : Todo) => void;
  onError : (message : ErrorType) => void;
  isLoading : boolean;
}

export const NewTodoForm: React.FC<Props> = ({onAdd, onError, isLoading}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    // 1. Validate
    if (!title.trim()) {
      onError(ErrorType.EmptyTitle);
      return;
    }
    // 2. Clear previous error
    onError(ErrorType.None);
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        disabled={isLoading}
      />
    </form>
  );
}
