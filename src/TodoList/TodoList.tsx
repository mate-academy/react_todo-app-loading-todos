import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.userId} />
      ))}
    </section>
  );
};
