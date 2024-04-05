import { FC, useContext } from 'react';
import { StateContext } from '../lib/TodosContext';
import { Status } from '../types/Status';
import type { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

export const TodoList: FC = () => {
  const { todos, query } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    switch (query) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
