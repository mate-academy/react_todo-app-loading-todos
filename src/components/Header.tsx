import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[],
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

export const Header: React.FC<Props> = ({
  todos,
  setSearchQuery,
  searchQuery,
}) => {
  const activeInputButton = todos.some(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      {
        todos.length > 0 && (
          <button
            aria-label="complete all tasks"
            type="button"
            className={cn('todoapp__toggle-all', {
              active: activeInputButton,
            })}
          />
        )
      }

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchQuery}
          onChange={(event) => (setSearchQuery(event.target.value))}
        />
      </form>
    </header>
  );
};
