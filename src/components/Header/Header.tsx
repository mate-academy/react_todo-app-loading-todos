import cn from 'classnames';

import { PostForm } from '../PostForm';

type Props = {
  hasEveryCompletedTodo: boolean;
};

export const Header: React.FC<Props> = ({ hasEveryCompletedTodo }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={cn('todoapp__toggle-all', {
        active: hasEveryCompletedTodo,
      })}
      data-cy="ToggleAllButton"
      aria-label="toggle-all-button"
    />

    <PostForm />
  </header>
);
