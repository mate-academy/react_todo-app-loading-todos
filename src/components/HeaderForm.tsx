import { useState } from 'react';

type Props = {
  onAddTodo: (title: string) => Promise<boolean>;
  isAdding: boolean;
  newTodoInputRef: React.RefObject<HTMLInputElement>;
};

export const HeaderForm: React.FC<Props> = ({
  onAddTodo,
  isAdding,
  newTodoInputRef,
}) => {
  const [title, setTitle] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await onAddTodo(title);

    if (success) {
      setTitle('');
      newTodoInputRef.current?.focus();
    }
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
        disabled={isAdding}
        ref={newTodoInputRef}
        autoFocus
      />
    </form>
  );
};
