import classNames from 'classnames';
import { AddTodoForm } from '../AddTodoForm';

interface Props {
  allCompleted: boolean;
  onAddTodo: (title: string) => void;
  onError: (message: string) => void;
}

export const TodoAppHeader = ({ allCompleted, onAddTodo, onError }: Props) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: allCompleted,
      })}
      data-cy="ToggleAllButton"
    />

    <AddTodoForm onAddTodo={onAddTodo} onError={onError} />
  </header>
);
