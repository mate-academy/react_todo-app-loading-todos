/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

interface Props {
  activeTodo: boolean
}

export const Input: React.FC<Props> = ({ activeTodo }) => (
  <header className="todoapp__header">
    {/* this buttons is active only if there are some active todos */}
    <button
      type="button"
      className={cn('todoapp__toggle-all', { active: !activeTodo })}
      data-cy="ToggleAllButton"
    />

    {/* Add a todo on form submit */}
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
