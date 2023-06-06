import React from 'react';
import { Todo } from './types/Todo';
import { TodoCard } from './TodoCard';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
