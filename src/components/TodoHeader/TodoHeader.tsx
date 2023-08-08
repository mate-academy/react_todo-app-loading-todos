import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { getCompletedTodos } from '../../services/todo';

type Props = {
  todos: Todo[],
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const isAllCompleted = getCompletedTodos(todos).length === todos.length;

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: isAllCompleted },
        )}
      >
        ❯
      </button>

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
