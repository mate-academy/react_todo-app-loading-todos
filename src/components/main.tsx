import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './todoInfo';

type Props = {
  todos: Todo[],
  addComplitedTodo: (id:number) => void,
};

export const Main: React.FC<Props> = ({ todos, addComplitedTodo }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        return (
          <TodoInfo
            todoInfo={todo}
            key={todo.id}
            addComplitedTodo={addComplitedTodo}
          />
        );
      })}
    </section>
  );
};
