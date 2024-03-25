import { useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  completedTodos: Todo[];
  activeTodos: Todo[];
};
export const Header: React.FC<Props> = ({
  todos,
  completedTodos,
  activeTodos,
}) => {
  const addTodoInputRef = useRef<HTMLInputElement>(null);
  const isClassActive = completedTodos.length > 0 && activeTodos.length === 0;

  useEffect(() => {
    if (addTodoInputRef.current) {
      addTodoInputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <header className="todoapp__header">
        {todos.length !== 0 && (
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: isClassActive,
            })}
            data-cy="ToggleAllButton"
          />
        )}

        <form>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            ref={addTodoInputRef}
          />
        </form>
      </header>
    </div>
  );
};
