import React from 'react';
import { Todo as TodoInterface } from '../../types/Todo';
import { Todo } from '../Todo/Todo';

interface TodoListProps {
  visibleTodos: TodoInterface[];
}

export const TodoList: React.FC<TodoListProps> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos?.map(todo => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
