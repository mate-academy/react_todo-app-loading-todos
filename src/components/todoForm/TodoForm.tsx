import React, { useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (val: Todo) => void,
  setIsVisible: (val: boolean) => void
};

export const TodoForm: React.FC<Props> = ({ onAdd, setIsVisible }) => {
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(1);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!title) {
        return;
      }

      const newTodo: Todo = {
        id: count,
        userId: 11822,
        title,
        completed: false,
      };

      onAdd(newTodo);
      setTitle('');
      setCount(prev => prev + 1);
      setIsVisible(false);
    }, [title],
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </form>
  );
};
