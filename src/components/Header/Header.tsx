import classNames from 'classnames';
import { useState } from 'react';

type HeaderProps = {
  handleToggleAll: () => void;
  handleCreateTodo: (newTitle: string) => void;
};

export const Header: React.FC<HeaderProps> = ({
  handleToggleAll,
  handleCreateTodo,
}) => {
  const [newTitle, setNewTitle] = useState('');

  const clearForm = () => {
    setNewTitle('');
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTitle.trim()) {
      handleCreateTodo(newTitle);
    }

    clearForm();
  };

  const toggleAll = () => {
    handleToggleAll();
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: true },
        )}
        aria-label="toggle-all-active"
        onClick={toggleAll}
      />

      {/* Add a todo on form submit */}
      <form
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleChangeTitle}
          value={newTitle}
        />
      </form>
    </header>
  );
};
