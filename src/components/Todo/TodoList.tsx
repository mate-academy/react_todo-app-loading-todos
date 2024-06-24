import React from 'react';
import { Todo } from '../../types/Todo';
import { useTodoFilter, useTodoTodos } from './Context';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const todos = useTodoTodos();
  const filter = useTodoFilter();

  let filterCallback;

  switch (filter) {
    case 'All':
      filterCallback = () => true;
      break;
    case 'Active':
      filterCallback = (todo: Todo) => !todo.completed;
      break;
    case 'Completed':
      filterCallback = (todo: Todo) => todo.completed;
      break;
    default:
      throw new Error('Filter option is not valid!!!');
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.filter(filterCallback).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
