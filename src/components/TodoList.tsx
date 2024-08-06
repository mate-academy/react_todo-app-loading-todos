import React from 'react';
import { Todo } from '../types/Todo';
import { TodoComponent } from './Todo';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deletePost: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  deletePost,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoComponent
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        deletePost={deletePost}
      />
    ))}
  </section>
);
