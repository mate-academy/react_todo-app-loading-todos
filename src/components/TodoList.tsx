import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface ListProps {
  todos: Todo[];
}

export const TodoList: React.FC<ListProps> = ({ todos }) => (
  <>
    {todos.map((todo: Todo) => {
      return <TodoItem key={todo.id} todo={todo}></TodoItem>;
    })}
  </>
);
