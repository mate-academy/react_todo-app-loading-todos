/* eslint-disable jsx-a11y/control-has-associated-label */
import { Todo } from '../../types/Todo';
import { countTodos } from '../../utils/counterTodos';

type Props = {
  todos: Todo[]
};

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  return (
    <header className="todoapp__header">
      {countTodos(todos, false) && (
        <button
          type="button"
          className="todoapp__toggle-all active"
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
        />
      </form>
    </header>
  );
};
