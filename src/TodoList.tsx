import React from 'react';
import { Todo } from './types/Todo';
import { TodoComp } from './TodoComp';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoComp
        key={todo.id}
        id={todo.id}
        completed={todo.completed}
        title={todo.title}
      />
    ))}
  </section>
);
