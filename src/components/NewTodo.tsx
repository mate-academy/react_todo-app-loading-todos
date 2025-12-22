import { RefObject, useState } from 'react';
import { Todo } from '../types/Todo';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  setFormError: (error: ErrorMessage) => void;
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || title.trim() === '') {
      setFormError(ErrorMessage.NO_TITLE);
      setTitle('');
      inputField.current?.focus();

      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    onFormSubmit({
      id: maxId + 1,
      userId: 3779,
      title,
      completed: false,
    });
    inputField.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
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
