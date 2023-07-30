import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  // query: string,
  // setQuery: (query: string) => void,
  todos: Todo[],
}

export const TodoHeader: React.FC<Props> = ({ todos }) => {
  const countActiveTodos = todos.filter(todo => !todo.completed).length;

  return (
    <header className="todoapp__header">
      {todos.length > 0
        && (
          <button
            aria-label="btn"
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: countActiveTodos > 0,
            })}
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
