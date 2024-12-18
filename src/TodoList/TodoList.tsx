import React from 'react';
import { Todo } from '../types/Todo';
import { CompletedTodo } from './CompletedTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <CompletedTodo key={todo.id} todo={todo} />
      ))}
      {/* This is a completed todo */}
      {/* This todo is an active todo */}
      {/* This todo is being edited */}
      {/* This todo is in loadind state */}
    </section>
  );
};
