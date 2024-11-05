import { Todo } from '../../../types/Todo';
import { isAllTodosCompleted } from '../../../utils/todos/getTodos';
import { TodoForm } from '../TodoForm/TodoForm';

export const TodoHeader = ({ todos }: { todos: Todo[] }) => {
  return (
    <header className="todoapp__header">
      {isAllTodosCompleted(todos) && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <TodoForm />
    </header>
  );
};
