import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  newTodo: RefObject<HTMLInputElement>,
};

export const TodoField: React.FC<Props> = ({ todos, newTodo }) => {
  const completedTodos = todos
    .every((todo) => todo.completed === true);

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          ('todoapp__toggle-all'),
          { active: completedTodos },
        )}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodo}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
