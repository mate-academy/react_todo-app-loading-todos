import React from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';

type Props = {
  todos: Todo[],
  active: number,
  toggleAll: Todo[],
  untoggleAll: Todo[],
  setTodos(todosArray: Todo[]): void,
};

export const Header: React.FC<Props> = ({
  todos,
  active,
  toggleAll,
  untoggleAll,
  setTodos,
}) => (
  <header className="todoapp__header">
    <button
      type="button"
      aria-label="Mute volume"
      className={classNames(
        'todoapp__toggle-all', { active: active === 0 },
      )}
      onClick={() => {
        if (todos.findIndex(todo => todo.completed === false) > -1) {
          setTodos(toggleAll);
        } else {
          setTodos(untoggleAll);
        }
      }}
    />

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
