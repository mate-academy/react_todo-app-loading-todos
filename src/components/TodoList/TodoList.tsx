import { useContext } from 'react';
import { TodoInfo } from '../Todo/TodoInfo';
import { TodosContext } from '../../contexts/TodosContext';

export const TodoList:React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      )) }
    </>
  );
};
