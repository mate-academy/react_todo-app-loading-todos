import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

type Props = {
  onSubmit: (title: string) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleField.current?.focus();
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(title);
    setTitle('');
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          value={title}
          ref={titleField}
          autoFocus={true}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitleChange}
        />
      </form>
    </>
  );
};
