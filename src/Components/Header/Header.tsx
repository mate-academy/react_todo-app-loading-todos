import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ todos, inputRef }) => {
  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: areAllCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
