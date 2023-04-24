import React from 'react';
import { Todo } from '../../types/Todo';
import { ToDoInfo } from '../ToDoInfo/ToDoInfo';

type Props = {
  todos: Todo[];
};

export const ToDoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <ToDoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
