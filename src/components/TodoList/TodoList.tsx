import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoItem } from '../TodoItem';
import { FilterContext } from '../FilterContext/FilterContext';
import { FilterBy } from '../../types/FilterBy';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const { filterBy } = useContext(FilterContext);

  const filteredTodos = () => {
    switch (filterBy) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const todosToRender = filteredTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">

      {todosToRender.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
