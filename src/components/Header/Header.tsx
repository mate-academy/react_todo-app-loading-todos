import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const Header = () => {
  const { visibleTodos } = useContext(TodosContext);

  const findActiveTodo = visibleTodos.find(todo => todo.completed === false);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {!!findActiveTodo && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
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
