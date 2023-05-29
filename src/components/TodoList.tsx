import { Todo as TodoType } from '../types/Todo';
import { Todo } from './Todo';

interface TodoListProps {
  visibleTodos: TodoType[];
}

export const TodoList: React.FC<TodoListProps> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
          />
        );
      })}
    </section>
  );
};
