import { Todo } from '../types/Todo';
import { HeaderForm } from './HeaderForm';

type Props = {
  onAddTodo: (title: string) => Promise<boolean>;
  isLoading: boolean;
  isAdding: boolean;
  isTogglingAll: boolean;
  onToggleAll: () => Promise<void>;
  todos: Todo[];
  newTodoInputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({
  onAddTodo,
  isLoading,
  isAdding,
  isTogglingAll,
  onToggleAll,
  todos,
  newTodoInputRef,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          disabled={isLoading || isTogglingAll}
          onClick={onToggleAll}
        />
      )}

      <HeaderForm
        onAddTodo={onAddTodo}
        isAdding={isAdding}
        newTodoInputRef={newTodoInputRef}
      />
    </header>
  );
};
