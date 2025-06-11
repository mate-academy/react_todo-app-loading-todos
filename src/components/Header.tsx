import cn from 'classnames';

type Props = {
  title: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isAllTodosCompleted: boolean;
};

export const Header: React.FC<Props> = ({
  title,
  onTitleChange,
  onSubmit,
  isAllTodosCompleted,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isAllTodosCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={onTitleChange}
        />
      </form>
    </header>
  );
};
