import { RefObject } from 'react';

interface Props {
  title: RefObject<HTMLInputElement>;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          type="text"
          ref={title}
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
