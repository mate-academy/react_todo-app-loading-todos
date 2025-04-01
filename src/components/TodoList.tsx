import React from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';
import { TodoItem } from './TodoItem';

type Props = {
  todoList: Todo[];
  isLoading: boolean;
  currentFilter: FilterType;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  isLoading,
  currentFilter,
}) => {
  const filteredTodos = todoList.filter(todo => {
    switch (currentFilter) {
      case FilterType.All:
        return true;

      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {isLoading && !todoList.length ? (
        <div className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      ) : (
        filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
      )}
    </section>
  );
};
