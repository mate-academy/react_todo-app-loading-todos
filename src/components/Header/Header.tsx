/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type HeaderProps = {
  todos: Todo[];
  handleToggleAll: () => void;
  handleNewTodoSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  newTodoTitle: string;
  setNewTodoTitle: (event: string) => void;
};

export const Header: React.FC<HeaderProps> = ({
  todos,
  handleToggleAll,
  handleNewTodoSubmit,
  newTodoTitle,
  setNewTodoTitle,
}) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      { todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all',
            {
              active: todos.some(todo => !todo.completed) && todos.length > 0,
            })}
          data-cy="ToggleAllButton"
          disabled={todos.length === 0}
          onClick={() => handleToggleAll()}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleNewTodoSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
