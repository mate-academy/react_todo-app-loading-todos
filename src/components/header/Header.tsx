import { FormEvent, useState } from 'react';

interface Props {
  onError: (errText: string) => void;
}

export const Header: React.FC<Props> = ({
  onError,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = async (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className="todoapp__toggle-all active" />

      <form onSubmit={handleAddTodo}>
        <input
          value={inputValue}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => {
            setInputValue(event.target.value);
            onError('');
          }}
        />
      </form>
    </header>
  );
};
