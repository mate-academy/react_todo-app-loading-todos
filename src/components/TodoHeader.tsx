import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  titleField: string;
  onTitleField: (newTitle: string) => void;
};

export const TodoHeader: React.FC<Props> = ({
  todos,
  titleField,
  onTitleField,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => onTitleField(event.target.value)}
          value={titleField}
        />
      </form>
    </header>
  );
};
