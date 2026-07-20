import React, { useState } from 'react';

interface Props {
  onSubmit: (title: string) => Promise<boolean>;
  onError: (value: string) => void;
  disabled?: boolean;
}

export const AddForm: React.FC<Props> = ({
  onSubmit,
  onError,
  disabled = false,
}) => {
  const [title, setTitle] = useState('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) {
      return;
    }

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      onError('Title should not be empty');

      return;
    }

    const isSuccess = await onSubmit(normalizedTitle);

    if (isSuccess) {
      setTitle('');
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    onError('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={changeHandler}
        disabled={disabled}
        aria-disabled={disabled}
        autoFocus
      />
    </form>
  );
};
