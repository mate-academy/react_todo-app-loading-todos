import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { getFilteredTasks } from '../api/service/getFilteredTasks';
import { TodoItem } from './TodoItem';

export const TodoMain = () => {
  const { todos, filter } = useContext(TodosContext);

  const filterCompletedTasks = getFilteredTasks(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterCompletedTasks.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
