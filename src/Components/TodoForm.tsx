import { FormEvent, useState } from 'react';

type Props = {
  onError: (error:string) => void;
  addTodo: (todo:string) => void;
};

export const TodoForm:React.FC<Props> = ({ onError, addTodo }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      return onError('Title should not be empty');
    }

    return addTodo(title);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};
