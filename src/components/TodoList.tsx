import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  loading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, loading }) => (
  <section className="todoapp__main">
    {loading && (
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    )}

    {todos.map(todo => (
      <div
        key={todo.id}
        className={`todo ${todo.completed ? 'completed' : ''}`}
      >
        <span className="todo__title">{todo.title}</span>
      </div>
    ))}
  </section>
);
