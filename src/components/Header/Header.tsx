import { useState, useEffect, useRef } from 'react';

type Props = {
  changeError: (error: string) => void;
};

export const Header: React.FC<Props> = ({ changeError }) => {
  const [title, setTitle] = useState('');
  const inputFocused = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    inputFocused.current?.focus();
  }, []);

  const onSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) {
      changeError('Enter a title');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={onSumbit}>
        <input
          ref={inputFocused}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
