import { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  activeTodos: number;
}

export const Footer: FC<Props> = ({ activeTodos, children }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {
          `${activeTodos} ${activeTodos === 1 ? 'item' : 'items'} left`
        }
      </span>

      {children}

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
