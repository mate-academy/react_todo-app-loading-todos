import { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </section>
  );
};
