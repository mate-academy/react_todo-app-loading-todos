import { useTodo } from '../Hooks/UseTodo';

export const TodosHeader = () => {
  const {
    todo,
  } = useTodo();

  const activeTodos = todo.filter(todos => !todos.completed).length;

  return (
    <header className="todoapp__header">
      {activeTodos > 0 && (
        <button
          type="button"
          aria-label="Toggle all todo"
          className="todoapp__toggle-all active"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
