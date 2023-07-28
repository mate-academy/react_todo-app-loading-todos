/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const Form: React.FC<Props> = ({ todos }) => {
  const activeTodos = todos.filter(todo => todo.completed === false);

  return (
    <>
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: activeTodos.length === 0,
        })}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </>
  );
};
