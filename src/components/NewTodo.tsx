import React, { useState } from 'react';

interface NewTodoProps {
  focusedInput: React.Ref<HTMLInputElement>;
  onAddTodo: (title: string) => void;
}

export const NewTodo: React.FC<NewTodoProps> = ({
  focusedInput,
  onAddTodo,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    onAddTodo(trimmed);
    setTitle('');
  };

  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={handleSubmit}
        ref={focusedInput}
      />
    </form>
  );
};
