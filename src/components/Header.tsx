import { USER_ID } from '../api/todos';
import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';
import { Form } from './Form';
import React from 'react';

interface Props {
  onAddTodo: (todo: Todo) => void;
  onError: (msg: string | null) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo, onError }) => {
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      onError('Title should not be empty');

      return;
    }

    setLoading(true);
    onError(null);

    try {
      const todo = await client.post<Todo>('todos', {
        title: value.trim(),
        userId: USER_ID,
        completed: false,
      });

      onAddTodo(todo);
      setValue('');
    } catch {
      onError('Unable to add a todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="todoapp__header">
      <h1 className="todoapp__title">todos</h1>

      <Form
        onSubmit={handleSubmit}
        value={value}
        onChange={setValue}
        disabled={loading}
      />
    </header>
  );
};
