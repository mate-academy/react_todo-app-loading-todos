import { FC, useState } from 'react';
import { TodoErrors } from '../../types/Error';

type Props = {
  onAddTodo: (title: string) => void;
  onError: (error: TodoErrors) => void;
};

const TodoForm: FC<Props> = ({ onAddTodo, onError }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedValue = title.trim();

    if (!trimmedValue) {
      onError(TodoErrors.EMPTY_TITLE);

      return;
    }

    onAddTodo(trimmedValue);
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
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};

export default TodoForm;
