import { useState } from 'react';

const NewTodoForm: React.FC<{
  onAdd: (title: string) => Promise<void>;
}> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const title = value.trim();

    if (!title) {
      return;
    }

    await onAdd(title);
    setValue('');
  };

  return (
    <form onSubmit={submit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};

export const Header: React.FC<{
  toggleAllActive: boolean;
  onToggleAll: () => Promise<void>;
  onAdd: (title: string) => Promise<void>;
}> = ({ toggleAllActive, onToggleAll, onAdd }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${toggleAllActive ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={() => void onToggleAll()}
      />

      <NewTodoForm onAdd={onAdd} />
    </header>
  );
};
