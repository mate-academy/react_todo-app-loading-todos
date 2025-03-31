import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  todos: Todo[];
  filterStatus: FilterStatus;
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  filterStatus,
  isLoading,
}) => {
  const filteredTodos = todos.filter(todo => {
    if (filterStatus === FilterStatus.All) {
      return true;
    }

    if (filterStatus === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filterStatus === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {isLoading && !todos.length ? (
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
