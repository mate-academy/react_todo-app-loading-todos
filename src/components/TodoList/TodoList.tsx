import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(currentTodo => (
        <TodoItem todo={currentTodo} key={currentTodo.id} />
      ))}
    </section>
  );
};
