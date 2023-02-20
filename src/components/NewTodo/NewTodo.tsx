/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

interface Props {
  allTodosCompleted: boolean
}

export const NewTodo: React.FC<Props> = ({ allTodosCompleted }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: allTodosCompleted },
        )}
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
};
