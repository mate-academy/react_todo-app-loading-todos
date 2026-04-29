import React from 'react';

type Props = {
  title: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Header: React.FC<Props> = ({ title, onChange, onSubmit }) => (
  <header className="todoapp__header">
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => onChange(e.target.value)}
      />
    </form>
  </header>
);
