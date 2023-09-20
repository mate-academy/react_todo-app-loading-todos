import { useContext } from 'react';
import { getFilteredTodos } from '../../utils/utils';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../../context/TodoContext';
import { FilterContext } from '../../context/FilterContext';

export const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const { selectedFilter } = useContext(FilterContext);

  const filteredTodos = getFilteredTodos(todos, selectedFilter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul className="todo-list" data-cy="todosList">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
};
