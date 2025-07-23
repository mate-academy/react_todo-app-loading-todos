import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type PropsList = {
  todos: Todo[];
};

export const TodoList: React.FC<PropsList> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map((todo: Todo) => {
      return <TodoItem key={todo.id} todo={todo}></TodoItem>;
    })}
  </section>
);
