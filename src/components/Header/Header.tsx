import { FC } from 'react';

type Props = {
  isAnyActiveTodos: boolean;
};

export const Header: FC<Props> = ({ isAnyActiveTodos }) => {
  return (
    <>
      <header className="todoapp__header">
        <button
          type="button"
          className="todoapp__toggle-all active"
          disabled={!isAnyActiveTodos}
          aria-label="toggle-button"
        />

        <form>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    </>
  );
};
