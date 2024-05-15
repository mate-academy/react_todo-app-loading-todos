import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};
