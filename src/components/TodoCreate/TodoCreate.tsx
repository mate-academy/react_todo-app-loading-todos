import { useState } from 'react';
import { Todo } from '../../libs/types';
import { USER_ID } from '../../libs/constants';

const getRandomId = (): number => {
  return +new Date();
};

type Props = {
  onAdd: (todo: Todo) => void;
};

export const TodoCreate: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: getRandomId(),
      userId: USER_ID,
      title,
      completed: false,
    };

    onAdd(newTodo);

    setTitle('');
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
