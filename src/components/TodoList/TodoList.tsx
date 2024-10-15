import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { FilterOptions } from '../../types/FilterOptions';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

interface Props {
  todos: Todo[];
  filterOption: FilterOptions;
}

export const TodoList: FC<Props> = ({ todos, filterOption }) => {
  const filteredTodos = getFilteredTodos(todos, filterOption);
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} isLoading={false} />
      ))}
    </section>
  );
};
