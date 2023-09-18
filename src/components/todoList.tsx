import React from 'react';
import { Todo } from '../types/Todo';
import { FilterOption } from '../types/filterOption';
import { Task } from './task';

interface Props {
  todos: Todo[];
  filterTodos: FilterOption;
}

export const TodoList: React.FC<Props> = ({ todos, filterTodos }) => {
  const visibleTodos = () => {
    if (filterTodos === 'Active') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filterTodos === 'Completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  };

  return (
    <section className="todoapp__main">
      {visibleTodos().map(todo => (
        <Task key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;
