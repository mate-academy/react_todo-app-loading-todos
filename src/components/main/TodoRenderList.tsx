import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoRenderList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <React.Fragment key={todo.id}>
        <TodoItem
          todo={todo}
        />
      </React.Fragment>
    ))}
  </section>
);
