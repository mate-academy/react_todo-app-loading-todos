import { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { TodoItem } from '../TodoItem/TodoItem';
// eslint-disable-next-line import/no-cycle
import { TodosContext } from '../../TodosContext/TodosContext';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map((todo) => (<TodoItem todo={todo} key={todo.id} />))}
    </section>
  );
};
