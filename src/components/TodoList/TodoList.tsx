/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  filteredTodos: Todo[];
}

export const TodoList: React.FC<Props> = React.memo(({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This todo is an active todo */}
      {filteredTodos.map(todo => {
        const { id, title, completed } = todo;

        return <TodoItem key={id} title={title} completed={completed} />;
      })}

      {/* This form is shown instead of the title and remove button */}
      {/* <form>
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form> */}
    </section>
  );
});

TodoList.displayName = 'TodoList';
