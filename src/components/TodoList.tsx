import { useCallback, useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './Context';
import { deleteTodo, patchTodo } from '../api/todos';

type Props = {
  todosToShow: Todo[];
};

export const TodoList: React.FC<Props> = ({ todosToShow }) => {
  const { setTodos } = useContext(TodosContext);
  const handleStatusChange = useCallback(
    (todo: Todo) => {
      patchTodo({
        ...todo,
        completed: !todo.completed,
      }).then(patchedTodo => {
        setTodos(prevTodos => {
          return prevTodos.map(prevTodo => {
            return prevTodo.id === patchedTodo.id ? patchedTodo : prevTodo;
          });
        });
      });
    },
    [setTodos],
  );

  const handleTodoDelete = useCallback(
    (todoId: number) => {
      deleteTodo(todoId);

      setTodos(prevTodos => {
        return prevTodos.filter(prevTodo => prevTodo.id !== todoId);
      });
    },
    [setTodos],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToShow.map(todo => (
        <div
          data-cy="Todo"
          key={todo.id}
          className={cn('todo', {
            completed: todo.completed,
          })}
        >
          {/* eslint-disable-next-line */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleStatusChange(todo)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleTodoDelete(todo.id)}
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
