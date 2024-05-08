import { FC } from 'react';
import React from 'react';

import { Todo } from '../types/Todo';
import { TodoItem } from '../components/TodoItem';

type Props = {
  todos: Todo[];
  deleteTodo: (todoId: number) => Promise<boolean>;
  newTodo: Todo | null;
};
export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
