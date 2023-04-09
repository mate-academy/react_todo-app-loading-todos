import { FC } from 'react';

export const AddingForm: FC = () => (
  <header className="todoapp__header">
    <button
      type="button"
      className="todoapp__toggle-all active"
      aria-label="make all todos active"
    />

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
