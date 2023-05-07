import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  removeTodo: (id: number) => void,
  changeTodo: (todoId: number, changingPart: Partial<Todo>) => void;
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    removeTodo,
    changeTodo,
  },
) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            removeTodo={removeTodo}
            changeTodo={changeTodo}
          />
        );
      })}
    </section>

  );
};
