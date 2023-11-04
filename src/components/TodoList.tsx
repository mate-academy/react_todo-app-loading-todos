import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoTask } from './TodoTask';

export const TodoList = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoTask key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
