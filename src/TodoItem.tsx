import cn from 'classnames';
import { Todo } from './types/Todo';
// import { TodoLoader } from './TodoLoader';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const handleCheckboxChange = () => {
    const updatedTodos
    = todos.map((item) => (item.id === todo.id
      ? { ...item, completed: !item.completed } : item));

    setTodos(updatedTodos);
  };

  return (
    <>
      <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>

        {/* Remove button appears only on hover */}
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>
      {/* <TodoLoader /> */}
    </>
  );
};
