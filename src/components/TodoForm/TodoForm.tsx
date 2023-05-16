/* eslint-disable jsx-a11y/control-has-associated-label */
import classnames from 'classnames';
import { FC, useState } from 'react';

interface Props {
  count: number;
}

export const TodoForm: FC<Props> = ({
  count,
}) => {
  const [queryTodo, setQueryTodo] = useState('');

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classnames('todoapp__toggle-all', {
          active: count,
        })}
      />

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
