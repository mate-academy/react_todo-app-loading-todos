import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  onAdd: (todo: Todo) => void;
  userId: number;
}

export const TodoForm: React.FC<Props> = ({ onAdd, userId }) => {
  const [newTodo, setNewTodo] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      id: 0,
      userId,
      title: newTodo,
      completed: false,
    });
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        ref={titleField}
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
    </form>
  );
};
