import React, { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
  onChange: () => void;
  onSubmit: (title: string) => void;
  onError: (errorMessage: string) => void;
};

export const AddTodo: React.FC<Props> = ({ onChange, onSubmit, onError }) => {
  const [title, setTitle] = useState('');

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    onChange();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const titleTrimmed = title.trim();

    if (!titleTrimmed) {
      onError('Title should not be empty');

      return;
    }

    onSubmit(titleTrimmed);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={handleChangeTitle}
      />
    </form>
  );
};
