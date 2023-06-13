import { Todo } from '../../types/Todo';

interface TodoHeaderProps {
  todos: Todo[] | undefined;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ todos }) => {
  const hasActive = todos?.some(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      {hasActive && (
        <button
          aria-label="none"
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

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
