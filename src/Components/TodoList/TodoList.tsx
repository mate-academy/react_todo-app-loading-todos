import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filterTodos = () => {
    switch (filter) {
      case Status.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case Status.COMPLETED:
        return todos.filter((todo) => todo.completed);
      case Status.ALL:
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodos().map((todo: Todo) => (
        <TodoItem todo={todo} />
      ))}
    </section>
  );
};
