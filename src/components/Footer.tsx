import { FC, memo, ReactNode } from 'react';

type Props = {
  itemsLeft: number;
  hasTodo: boolean;
  children: ReactNode;
};

export const Footer: FC<Props> = memo(({ itemsLeft, hasTodo, children }) => {
  return hasTodo ? (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {children}

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  ) : null;
});

Footer.displayName = 'FooterMemo';
