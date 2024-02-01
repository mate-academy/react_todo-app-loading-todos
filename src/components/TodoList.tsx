import classNames from 'classnames';
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { deleteTodo } from '../api/todos';
import { ErrorMessage } from '../types/ErrorMessage';

export const TodoList: React.FC = () => {
  const {
    filteredTodos,
    setTodos,
    setErrorMessage,
  } = useContext(TodoContext);

  const handleCatch = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => setTodos(prevTodos => prevTodos
        .filter(todo => todo.id !== todoId)))
      .catch(() => setErrorMessage(ErrorMessage.failedLoad))
      .finally(() => handleCatch());
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              onChange={() => { }}
              checked={todo.completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
