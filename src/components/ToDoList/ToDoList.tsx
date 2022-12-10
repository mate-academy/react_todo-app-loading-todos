import React from 'react';
import { Todo } from '../../types/Todo';
import { ToDo } from '../ToDo/ToDo';

type Props = {
  todos: Todo[];
};

export const ToDoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <ToDo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
