import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = React.memo(({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
});

TodoList.displayName = 'TodoList';
