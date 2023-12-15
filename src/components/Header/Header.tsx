import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todosFromServer: Todo[];
}

export const Header: React.FC<Props> = (props: Props) => {
  const { todosFromServer } = props;

  return (
    <header className="todoapp__header">
      <button
        aria-label="Toggle All"
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: todosFromServer.every(todo => todo.completed) },
        )}
        data-cy="ToggleAllButton"
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
