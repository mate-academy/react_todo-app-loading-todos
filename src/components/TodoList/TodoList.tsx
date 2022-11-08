import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListItem } from '../TodoListItem/TodoListItem';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(({ completed, id, title }) => (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed,
          })}
          key={id}
        >
          <TodoListItem title={title} />
        </div>
      ))}
    </section>
  );
});
