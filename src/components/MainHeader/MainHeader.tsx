import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const MainHeader = ({ todos }: Props) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {(todos.length > 0) && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          aria-label="Toggle between active and not active"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
