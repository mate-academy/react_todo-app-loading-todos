/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todoList: Todo[];
  isLoading: boolean;
  // handleDeleteTodo: (todoId: number) => Promise<void> | undefined;
  currentTodo: number;
  // handleUpdateTodo: (todo: Todo) => Promise<void> | undefined;
}

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
  isLoading,
  // handleDeleteTodo,
  currentTodo,
  // handleUpdateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList?.map(todo => {
        const isActiveModal = isLoading && currentTodo === todo.id;

        return (
          <TodoItem todo={todo} isActiveModal={isActiveModal} key={todo.id} />
        );
      })}
    </section>
  );
};
