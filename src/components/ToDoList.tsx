import { Todo } from '../types/Todo';

interface TodoListProps {
  todos: Todo[];
}
const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div key={todo.id} className="todo-item">
          {todo.title}
        </div>
      ))}
    </section>
  );
};

export default TodoList;
