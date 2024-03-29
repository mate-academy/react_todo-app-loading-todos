import React from 'react';

interface Props {
  onAddTodo: (e: React.FormEvent) => void;
  isAllCompleted: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  todosLength: number;
}

const Header: React.FC<Props> = ({
  onAddTodo,
  isAllCompleted,
  handleInputChange,
  todosLength,
}) => {
  const handleClearInput = () => {
    handleInputChange({
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <header className="todoapp__header">
      {todosLength > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
        />
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          onAddTodo(e);
          handleClearInput();
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default Header;
