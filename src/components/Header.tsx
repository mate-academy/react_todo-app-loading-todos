import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  title: string,
  onSetTitle: (t: string) => void,
  onTitleError: (t: string) => void,
};

export const Header:React.FC<Props> = ({
  todos,
  title,
  onSetTitle,
  onTitleError,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      onTitleError('Title should not be empty');
      setTimeout(() => {
        onTitleError('');
      }, 3000);
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length && (
        // eslint-disable-next-line
        <button
          type="button"
          className={todos.length
            ? 'todoapp__toggle-all active'
            : 'todoapp__toggle-all'}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            onSetTitle(e.target.value);
          }}
        />
      </form>
    </header>
  );
};
