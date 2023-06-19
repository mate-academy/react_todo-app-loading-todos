import React from 'react';
import { Todo } from '../../types/Todo';
import { Error } from '../../types/Error';

type Props = {
  todos: Todo[],
  onError: (isError: Error) => void
};

export const Header: React.FC<Props> = ({ todos, onError }) => {
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onError(Error.ADD);
  };

  return (
    <header className="todoapp__header">
      {todos.some(todo => !todo.completed) && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className="todoapp__toggle-all active"
          onClick={clickHandler}
        />
      )}

      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
