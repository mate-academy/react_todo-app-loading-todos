import cn from 'classnames';
import { TodoForm } from '../TodoForm/TodoForm';

export const Header = () => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: false,
        })}
        data-cy="ToggleAllButton"
      ></button>

      <TodoForm />
    </header>
  );
};
