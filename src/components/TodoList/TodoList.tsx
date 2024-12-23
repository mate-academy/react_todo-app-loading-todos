import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent/TodoComponent';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoComponent todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
