import { useState, useContext, useRef, useEffect } from 'react';
import cn from 'classnames';
import { TodosContext } from '../store';

export const TodoHeader: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const todosIsDone = todos.every(t => t.completed);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: todosIsDone })}
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
