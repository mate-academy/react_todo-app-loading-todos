import { Todo } from './types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  togleCheck: (id: number) => void;
  toDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, togleCheck, toDelete }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo) => (
        //
        <TodoItem
          todo={todo}
          key={todo.id}
          togleCheck={togleCheck}
          toDelete={toDelete}
        />
      ))}
    </section>
  );
};
