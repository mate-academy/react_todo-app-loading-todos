import React from 'react';
// import { Todo } from '../types/Todo';

// type Props = {
//   onAdd: (todo: Todo) => Promise<void>;
// };

export const TodoForm: React.FC = () => (
  <header className="todoapp__header">
    {/* this buttons is active only if there are some active todos */}
    <button
      type="button"
      className="todoapp__toggle-all active"
      aria-label="New Todo"
    />

    {/* Add a todo on form submit */}
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
