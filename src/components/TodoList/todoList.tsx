import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoRecord } from '../Todo/todoRecord';

type Props = {
  todoList: Todo[];
  loadedTodosIds: Set<number>;
};

export const TodoList: React.FC<Props> = ({ todoList, loadedTodosIds }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => {
        return (
          <TodoRecord
            key={todo.id}
            todo={todo}
            isLoaded={loadedTodosIds.has(todo.id)}
          />
        );
      })}
    </section>
  );
};
