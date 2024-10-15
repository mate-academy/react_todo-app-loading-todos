/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';
import { TodoComponent } from './TodoComponent';

interface TodoListProps {
  todosAfterFiltering: Todo[];
  onTodoDelete: (todoId: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todosAfterFiltering,
  onTodoDelete,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosAfterFiltering.map(todo => {
        return (
          <TodoComponent
            todo={todo}
            onTodoDelete={onTodoDelete}
            key={todo.id}
          />
        );
      })}
    </section>
  );
};
