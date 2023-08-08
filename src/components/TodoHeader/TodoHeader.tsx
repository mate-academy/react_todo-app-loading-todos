import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { isAllCompleted } from '../../services/todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: isAllCompleted(todos) },
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
