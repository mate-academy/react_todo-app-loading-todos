import { FormEvent, RefObject, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  setFormError: (error: string) => void;
  inputField: RefObject<HTMLInputElement>;
  onFormSubmit: (todo: Todo) => void;
  todos: Todo[];
};

export const NewTodo: React.FC<Props> = ({
  inputField,
  onFormSubmit,
  setFormError,
  todos,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.KeyboardEvent) => {
    if (!title && event.key === 'Enter') {
      setFormError('Title should not be empty');

      return;
    }

    if (event.key === 'Enter') {
      const maxId = Math.max(...todos.map(todo => todo.id));

      onFormSubmit({
        id: maxId + 1,
        userId: 3779,
        title,
        completed: false,
      });
    }
  };

  return (
    <form
      onSubmit={(event: FormEvent) => event.preventDefault()}
      onKeyDown={handleSubmit}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={inputField}
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};
