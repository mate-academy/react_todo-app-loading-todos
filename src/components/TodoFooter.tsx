import { useContext } from 'react';
import { TodoActiveCount } from './TodoActiveCount';
import { TodoClearCompleted } from './TodoClearCompleted';
import { TodoFilter } from './TodoFilter';
import { TodosContext } from '../context/TodoContext';

export const TodoFooter = () => {
  const { todos } = useContext(TodosContext);
  const completedTasksCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <TodoActiveCount />

      <TodoFilter />

      {!!completedTasksCount && <TodoClearCompleted />}
    </footer>
  );
};
