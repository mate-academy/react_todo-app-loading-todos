import { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../context/TodoContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoHeader: React.FC = () => {
  const {
    visibleTodos,
    activeTodosAmount,
    handleToggleAll,
  } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {visibleTodos.length > 0 && (
        <button
          type="button"
          onClick={handleToggleAll}
          className={classNames('todoapp__toggle-all', {
            active: activeTodosAmount === 0,
          })}
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
