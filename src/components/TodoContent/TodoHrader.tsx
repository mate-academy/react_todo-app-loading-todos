/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext/TodoContext';

export const TodoHeader: FC = () => {
  const { todosCount, activeTodosLeft } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {todosCount > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeTodosLeft === 0,
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
