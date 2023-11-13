import { useContext } from 'react';
import cn from 'classnames';
import { TodoContext } from '../TodoContext';

export const Header: React.FC = () => {
  const { todos } = useContext(TodoContext);

  const hasActiveTodos = todos.some(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: hasActiveTodos },
        )}
        data-cy="ToggleAllButton"
        aria-label="ToggleAll"
      />

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
