import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

export const TodoHeader = () => {
  const { todos } = useContext(TodosContext);
  const activeSomeTask = todos.some(todo => todo.completed !== false);

  return (
    <header className="todoapp__header">

      {!!todos.length && (
        <button
          type="button"
          className={classNames(
            'todoapp__toggle-all', {
              active: activeSomeTask,
            },
          )}
          data-cy="ToggleAllButton"
          aria-label="Toggle All"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
