import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onAddTodo: (title: string) => void;
  onError: (message: string) => void;
}

export const AddTodoForm = ({ onAddTodo, onError }: Props) => {
  const [title, setTitle] = useState('');

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart().replace(/\s{2,}/g, ' ');

    setTitle(value);
  };

  const handleSumbitAddTodo = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trimEnd();

    if (trimmedTitle === '') {
      onError('Title should not be empty');

      return;
    }

    onAddTodo(trimmedTitle);
    setTitle('');
  };

  return (
    <form onSubmit={handleSumbitAddTodo}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChangeInput}
      />
    </form>
  );
};
