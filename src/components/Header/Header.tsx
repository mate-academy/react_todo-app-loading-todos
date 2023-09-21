import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../../TodosContext';

type Props = {

};

export const Header: React.FC<Props> = () => {
  const { todos } = useContext(TodosContext);

  const activeTodos = useMemo(() => (
    todos.filter(todo => todo.completed === false)), [todos]);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {activeTodos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
          aria-label="delete"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
