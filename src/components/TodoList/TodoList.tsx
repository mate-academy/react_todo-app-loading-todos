import React from 'react';
import { Todo } from '../../types/Todo.js';
import { TodoUser } from '../TodoUser/TodoUser';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoUser todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
