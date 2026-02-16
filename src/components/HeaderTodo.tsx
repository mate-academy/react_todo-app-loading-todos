import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  todoInputRef: React.RefObject<HTMLInputElement>;
}

export const HeaderTodo: React.FC<Props> = ({ todos, todoInputRef }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.length > 0 && todos.every(t => t.completed),
        })}
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          ref={todoInputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
