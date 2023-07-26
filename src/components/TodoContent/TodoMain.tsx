import { FC, useContext } from 'react';
import { TodoInfo } from './TodoInfo';
import { TodoContext } from '../TodoContext/TodoContext';

export const TodoMain: FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
