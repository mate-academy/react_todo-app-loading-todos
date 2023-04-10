import React from 'react';
import { Todo } from '../types/Todo';
import { SingleTodo } from './SingleTodo';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <SingleTodo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
