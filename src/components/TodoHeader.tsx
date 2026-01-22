import { FormEvent } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  todoTitle: string;
  setTodoTitle: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleSubmit: (e: FormEvent) => void;
};

export const TodoHeader: React.FC<Props> = ({
  todos,
  todoTitle,
  setTodoTitle,
  inputRef,
  handleSubmit,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
          disabled={false}
        />
      </form>
    </header>
  );
};
