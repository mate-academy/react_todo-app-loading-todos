import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../TodoContext';
import { StateFilter } from '../../types/StateFilter';

export const TodoList = () => {
  const { todos, selectedState } = useContext(TodoContext);

  const filterTodos = () => {
    switch (selectedState) {
      case StateFilter.Active:
        return todos.filter((todo) => !todo.completed);
      case StateFilter.Completed:
        return todos.filter((todo) => todo.completed);
      case StateFilter.All:
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
