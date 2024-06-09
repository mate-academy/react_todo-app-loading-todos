import { Todo } from '../../types/Todo';

type TodoContentProps = {
  todos: Todo[];
  children: React.ReactNode;
};

export const TodoContent: React.FC<TodoContentProps> = ({ children }) => {
  return (
    <>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {children}
      </div>
    </>
  );
};
