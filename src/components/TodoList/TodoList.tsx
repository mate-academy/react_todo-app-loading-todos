import React from 'react';
import './TodoList.scss';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  loading: boolean;
  filterType: FilterType;
};

export const TodoList: React.FC<Props> = ({ todos, loading, filterType }) => {
  const getFilteredTodos = () => {
    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} loading={loading} />
      ))}
    </section>
  );
};
