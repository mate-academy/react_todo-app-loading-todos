import classNames from 'classnames';
import { FC, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoForm: FC<Props> = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.completed).length;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: completedTodos === todos.length,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={inputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
