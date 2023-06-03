import React from 'react';
import { Todo } from '../../types/types';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      { todos && (
        <section className="todoapp__main">
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </section>
      )}
    </>
  );
};
