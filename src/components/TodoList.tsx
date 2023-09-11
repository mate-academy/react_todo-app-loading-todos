import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { Status } from '../types/filterStatusENUM';

type Props = {
  todos: Todo[];
  selectedFilter: string;
};

function filteredTodos(todos: Todo[], selectedFilter: string) {
  switch (selectedFilter) {
    case Status.Acctive:
      return todos.filter(item => !item.completed);
    case Status.Completed:
      return todos.filter(item => item.completed);
    default:
      return todos;
  }
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedFilter,
}) => {
  const updatedTodos = filteredTodos(todos, selectedFilter);

  return (
    <section className="todoapp__main">
      {updatedTodos.map((todo: Todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        );
      })}
    </section>
  );
};

export default TodoList;
