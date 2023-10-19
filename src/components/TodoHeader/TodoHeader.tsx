/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useTodosState } from '../../contexts/TodosContext';

export const TodoHeader: React.FC = () => {
  const [todos] = useTodosState();

  const isAllCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {
        todos.length > 0 && (
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: isAllCompleted,
            })}
            data-cy="ToggleAllButton"
          />
        )
      }

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
