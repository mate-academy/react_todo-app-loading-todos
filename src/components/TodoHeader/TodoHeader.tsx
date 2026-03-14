import classNames from 'classnames';

type Props = {
  isAllTodosComplete: () => boolean;
  handleSubmit: (event: React.FormEvent<Element>) => void;
  todoTitle: string;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoHeader: React.FC<Props> = ({
  isAllTodosComplete,
  handleSubmit,
  setTodoTitle,
  todoTitle,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllTodosComplete(),
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          onChange={event => setTodoTitle(event.target.value)}
          value={todoTitle}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
