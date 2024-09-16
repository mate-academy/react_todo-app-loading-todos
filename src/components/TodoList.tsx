import React, { useContext } from 'react';
import { Filter } from '../types/Types';
import { StateContext } from '../managment/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);

  const getFilteredTodos = () => {
    switch (filterBy) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {getFilteredTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
