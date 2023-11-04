import { TodoItem } from './TodoListElements/TodoItem';

export const TodoList: React.FC = () => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoItem />
    </section>
  );
};
