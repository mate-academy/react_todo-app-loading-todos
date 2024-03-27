import { FC } from 'react';
import { useTodos } from '../utils/TodosContext';
import { filterTodos } from '../utils/filterTodos';
import { TodoItem } from './TodoItem';

export const TodoList: FC = () => {
  const { todos, filter } = useTodos();

  const visibleTodos = filterTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
