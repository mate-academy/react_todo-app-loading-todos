import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[];
};
export const Header: React.FC<Props> = ({ todoList }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active:
            todoList.length === todoList.filter(todo => todo.completed).length,
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
