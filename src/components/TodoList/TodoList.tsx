import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <ul>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
