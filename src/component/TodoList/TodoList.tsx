import React, { useMemo } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { LoadType } from '../../LoadType';

type Props = {
  todos: Todo[];
  typeOfLoad: LoadType;
};

export const TodoList: React.FC<Props> = ({ todos, typeOfLoad }) => {
  const visibleTodos = useMemo(() => todos.filter(({ completed }) => {
    switch (typeOfLoad) {
      case LoadType.Active:
        return !completed;

      case LoadType.Completed:
        return completed;

      default:
        return true;
    }
  }), [todos, typeOfLoad]);

  return (
    <section className="todoapp__main">
      {visibleTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
