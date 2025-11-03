import classNames from 'classnames';
import { Todo } from '../../types';

type Props = {
  quantityTasksActive: number;
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ quantityTasksActive, todos }) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: quantityTasksActive === 0,
          })}
          data-cy="ToggleAllButton"
        />
      )}

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
