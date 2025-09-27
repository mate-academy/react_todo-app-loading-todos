import React, { useState } from 'react';

type Props = {
  // Тут буде: onCreate: (title: string) => Promise<void>;
  // loading: boolean; // Можна додати пізніше
};

export const NewTodoForm: React.FC<Props> = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // if (title.trim()) {
    //   onCreate(title.trim())
    //     .then(() => setTitle(''))
    //     .catch(e => console.error(e));
    // }
    console.log(
      `Submitting new todo with title: ${title} (currently disabled)`,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        disabled
      />
    </form>
  );
};
