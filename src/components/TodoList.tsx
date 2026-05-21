import { Todo } from '../types/Todo';
import { TodoCard } from './Todo';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </>
  );
};
