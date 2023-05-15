import { useContext } from 'react';
import { TodoInfo } from '../Todo/TodoInfo';
import { TodosContext } from '../../contexts/TodosContext';

export const TodoList:React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todos_list">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      )) }
    </div>
  );
};
