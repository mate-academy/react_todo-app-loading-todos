import React from 'react';
import { TodoItem } from '../Todo/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        );
      })}
    </section>
  );
};
