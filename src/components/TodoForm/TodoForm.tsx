/* eslint-disable jsx-a11y/control-has-associated-label */
import classnames from 'classnames';
import { FC, useState } from 'react';

interface Props {
  activeTodosCount: number;
}

export const TodoForm: FC<Props> = ({
  activeTodosCount,
}) => {
  const [queryTodo, setQueryTodo] = useState('');

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={classnames('todoapp__toggle-all', {
          active: activeTodosCount,
        })}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={queryTodo}
          onChange={(event) => setQueryTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
