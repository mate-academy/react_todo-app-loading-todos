import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';
import { TodoItem } from '../Todoitem';

interface Props {
  todos: Todo[],
  filterBy: FilterBy
}

export const TodoList: React.FC<Props> = ({ todos, filterBy }) => {
  const setVisibleTodos = useMemo(
    () => {
      return todos.filter((todo: Todo) => {
        switch (filterBy) {
          case FilterBy.active:
            return !todo.completed;

          case FilterBy.completed:
            return todo.completed;

          default:
            return todos;
        }
      });
    }, [todos, filterBy],
  );

  const visibleTodos = setVisibleTodos;

  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
        />
      ))}
    </section>
  );
};
