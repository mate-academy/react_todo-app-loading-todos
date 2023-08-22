import React from 'react';
import { TodosItems } from './TodosItems';
import { useTodo } from '../Hooks/UseTodo';

export const Todoslist: React.FC = () => {
  const { filterTodos } = useTodo();

  return (
    <section className="todoapp__main">
      {filterTodos().map(todos => (
        <TodosItems todo={todos} key={todos.id} />
      ))}
    </section>
  );
};
