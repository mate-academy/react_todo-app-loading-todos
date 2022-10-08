import classNames from 'classnames';
import { RefObject } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  ref: RefObject<HTMLInputElement>;
  todos: Todo[];
};

export const TodoField: React.FC<Props> = ({ ref, todos }) => {
  const completedTodos = todos
    .every((todo) => todo.completed === true);

  return (
    <>
      {todos.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={classNames(
            ('todoapp__toggle-all'),
            { active: completedTodos },
          )}
          aria-label="Toggle"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={ref}
          className="todoapp__new-todo"
          placeholder="What me do?"
        />
      </form>
    </>
  );
};
