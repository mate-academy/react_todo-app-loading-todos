import React, { useState } from 'react';
import { USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  onAdd: (newTodo: Todo) => Promise<Todo>;
  setError: (message: string) => void;
  updateTodos: (todos: Todo[]) => void;
};

export const CreateForm: React.FC<Props> = ({
  onAdd,
  setError,
  updateTodos,
}) => {
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Title should not be empty');

      return;
    }

    setIsSaving(true);
    const newTodo = {
      id: 0,
      title,
      userId: USER_ID,
      completed: false,
      isLoading: true,
    };

    updateTodos(prev => [...prev, newTodo]);

    onAdd(newTodo)
      .then(() =>
        updateTodos(prev => [
          ...prev.slice(0, -1),
          { ...newTodo, isLoading: false },
        ]),
      )
      .catch(() => setError('Unable to add a todo'))
      .then(() => {
        setTitle('');
        setIsSaving(false);
      });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTimeout(() => setError(''), 3000);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        disabled={isSaving}
        autoFocus
        value={title}
        onChange={handleTitleChange}
      />
    </form>
  );
};
