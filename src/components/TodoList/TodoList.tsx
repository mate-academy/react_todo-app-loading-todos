import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../Filter';
import { TodoItem } from '../Todo';

type Props = {
  todos: Todo[];
};

enum TodoStatus {
  All,
  Active,
  Completed,
}

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  const [filterStatus, setFilterStatus] = useState(TodoStatus.All);
  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case TodoStatus.Active:
        return todos.filter(todo => !todo.completed);
      case TodoStatus.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filterStatus, todos]);

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </section>
      {!!todos.length && (
        <Filter
          onStatusChange={setFilterStatus}
          status={filterStatus}
          activeTodos={activeTodos}
        />
      )}

    </>
  );
});
