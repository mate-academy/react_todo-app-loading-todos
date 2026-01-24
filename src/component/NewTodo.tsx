import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { ErrorType } from '../App';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onTypingChange?: (isTyping: boolean) => void;
  setError: (error: ErrorType | null) => void;
};

export const NewTodo: React.FC<Props> = ({ onTypingChange }) => {
  const [title, setTitle] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value);
    onTypingChange?.(value.trim().length > 0);
  };

  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
      />
    </form>
  );
};
