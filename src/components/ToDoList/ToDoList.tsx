import React from 'react';
import { Todo } from '../../types/Todo';
import { ToDoItem } from '../ToDoItem/ToDoItem';

type Props = {
  visibleToDos: Todo[];
};

export const ToDoList: React.FC<Props> = ({ visibleToDos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleToDos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
