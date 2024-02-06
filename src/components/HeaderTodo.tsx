import classNames from 'classnames';
import { useTodo } from '../providers/AppProvider';
import { Todo } from '../types/Todo';

export const HeaderTodo = () => {
  const {
    todos, setTodos, title, setTitleContext,
  } = useTodo();

  const completeAllTodos = () => {
    setTodos((prev: Todo[]) => {
      if (prev.some(v => !v.completed)) {
        return prev.map(v => ({ ...v, completed: true }));
      }

      return prev.map(v => ({ ...v, completed: false }));
    });
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {todos.length === 0 || (
      /* eslint-disable-next-line */
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed === true),
          })}
          data-cy="ToggleAllButton"
          onClick={completeAllTodos}
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitleContext(e.target.value);
          }}

          // onClick={() => setError('Title should not be empty')}
        />
      </form>
    </header>
  );
};
