import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todo';

interface Props {
  onAddTodo: (newTodo: Todo) => void;
}

export const TodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const intputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    intputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setError('Title should be not empty');

      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      userId: 0,
      title: title.trim(),
      completed: false,
    };

    onAddTodo(newTodo);
    setTitle('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={intputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
    </form>
  );
};
