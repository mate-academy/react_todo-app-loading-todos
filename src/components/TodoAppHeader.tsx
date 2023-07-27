import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[],
  addTodo: (event: React.FormEvent) => void,
  newTitle: string,
  setNewTitle: (newTitle: string) => void,
}

export const TodoAppHeader: React.FC<Props> = ({
  todos,
  addTodo,
  newTitle,
  setNewTitle,
}) => {
  const hasActiveTodo = todos.some(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !hasActiveTodo,
          })}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
