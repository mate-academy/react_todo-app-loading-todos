import React, { useContext } from 'react';
import { TodosItems } from './TodosItems';
import { TodoContext } from './TodosContext';

export const Todoslist: React.FC = () => {
  const { filterTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main">
      {filterTodos().map(todos => (
        <TodosItems todo={todos} key={todos.id} />
      ))}
    </section>
  );
};
