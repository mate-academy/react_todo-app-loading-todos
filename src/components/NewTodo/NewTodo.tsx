import { useState } from 'react';
import { USER_ID } from '../../constants/userid';

// const USER_ID = 10282;

interface Props {
  maxId: number;
}

export const NewTodo: React.FC<Props> = ({ maxId }) => {
  const [title, setTitle] = useState<string>('');
  const [idCounter, setIdCounter] = useState<number>(maxId);

  const handleInputTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTodoAddition = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitle('');

      return;
    }

    setIdCounter(currentId => currentId + 1);

    const preparedTodo = {
      id: idCounter,
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    };
  };

  return (
    // {/* Add a todo on form submit */}
    <form
      action="#"
      method="POST"
      onSubmit={handleTodoAddition}
    >
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleInputTodo}
      />
    </form>
  );
};
