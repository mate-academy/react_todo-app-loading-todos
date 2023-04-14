import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  handleToggleAll: () => void,
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ handleToggleAll, todos }) => (
  <header className="todoapp__header">
    {todos.length > 0 && (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button
        type="button"
        className={classNames('todoapp__toggle-all',
          { active: todos.filter(item => !item.completed).length === 0 })}
        onClick={handleToggleAll}
      />
    )}

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
