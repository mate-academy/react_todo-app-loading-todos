import classNames from 'classnames';
import { useMemo } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  preparedTodos: Todo[];
}

export const TodoHeader: React.FC<Props> = ({ preparedTodos }) => {
  const isToggleAllChecked = useMemo(() => {
    return preparedTodos.every(todo => todo.completed);
  }, [preparedTodos]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isToggleAllChecked,
        })}
        data-cy="ToggleAllButton"
      />

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
