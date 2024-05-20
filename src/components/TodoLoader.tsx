import cn from 'classnames';
import { Todo } from '../types/Todo';

type LoaderProps = {
  isLoadingTodoId: number | null;
  todo: Todo;
};

export const TodoLoader: React.FC<LoaderProps> = ({
  isLoadingTodoId,
  todo,
}) => (
  <div
    data-cy="TodoLoader"
    className={cn('modal overlay', {
      'is-active': isLoadingTodoId === todo.id,
    })}
  >
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
);
