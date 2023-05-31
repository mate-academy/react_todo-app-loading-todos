import { TodoData } from '../types/Todo';
import { Todo } from './Todo';

interface TodoListProps {
  todos: TodoData[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>

  );
};
