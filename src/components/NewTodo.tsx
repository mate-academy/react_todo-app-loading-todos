import { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  onSubmit: (post: Todo) => Promise<void>;
  userId: number;
  onError: (_: string) => void;
};

export const NewTodoForm: React.FC<Props> = ({
  onSubmit,
  userId,
  onError = () => {},
}) => {
  const [title, setTitle] = useState('');
  const [idCount, setIdCount] = useState(1);

  const [hasTitleErrorMessage, setHasTitleErrorMessage] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleErrorMessage('Title should not be empty');
      onError(hasTitleErrorMessage);

      return;
    }

    const id = idCount;

    const reset = () => {
      setTitle('');
    };

    onSubmit({ id, title, userId, completed: false })
      .then(reset)
      .finally(() => {
        setIdCount(currentCount => currentCount + 1);
      });
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
