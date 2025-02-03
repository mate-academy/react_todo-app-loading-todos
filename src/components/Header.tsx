import classNames from 'classnames';

export const Header: React.FC = () => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: false })}
        data-cy="ToggleAllButton"
      />
      <form>
        <input
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          //onSubmit={() => addTodo}
        />
      </form>
    </header>
  );
};
