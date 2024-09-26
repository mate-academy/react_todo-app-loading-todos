import { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  onSubmit: (post: Omit<Todo, 'id'>) => Promise<void>;
  userId: number;
  onError: (error: string) => void;
};

export const NewTodoForm: React.FC<Props> = ({ onSubmit, userId, onError }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      onError('Title should not be empty');

      return;
    }

    onSubmit({ userId, completed: false, title }).then(() => setTitle(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleTitleChange}
      />
    </form>
  );
};
