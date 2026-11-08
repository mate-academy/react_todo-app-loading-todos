import cn from 'classnames';
import './Header.scss';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | undefined;
};

export const Header = ({ todos }: Props) => {
  return (
    <header className="todoapp__header">
      {todos && todos.length > 0 && (
        <button
          type="button"
          className={cn({
            'todoapp__toggle-all': true,
            active: todos?.every(todo => todo.completed),
          })}
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
          autoFocus
        />
      </form>
    </header>
  );
};
