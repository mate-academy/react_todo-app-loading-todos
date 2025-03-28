import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { SubmitForm } from './SubmitForm';

interface Props {
  todos: Todo[];
  onCheckAll: () => void;
  onAddTodo: (todo: Todo) => void;
}

export const HeaderTodoApp: React.FC<Props> = ({
  todos,
  onCheckAll,
  onAddTodo,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          hidden={!todos}
          onClick={onCheckAll}
        />
      )}
      <SubmitForm
        todos={todos}
        onAddTodo={onAddTodo}
        inputClassName={'todoapp__new-todo'}
      />
    </header>
  );
};
