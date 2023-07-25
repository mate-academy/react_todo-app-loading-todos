/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const TodoHeader: React.FC = () => {
  const {
    todos,
    isEveryTodoCompleted,
  } = useContext(TodosContext);

  return (
    <header className="todoapp__header">
      {todos.length > 0
        && (
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: isEveryTodoCompleted(),
            })}
          />
        )}

      <form onSubmit={event => event.preventDefault()}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
