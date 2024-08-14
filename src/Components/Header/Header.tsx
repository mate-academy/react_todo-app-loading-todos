import { useState } from 'react';

type HeaderProps = {
  onAdd: (title: string) => void;
  areAllTodosCompleted: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  onAdd,
  areAllTodosCompleted,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addToDo = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${areAllTodosCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={addToDo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
