/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { memo, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import { Todo as TodoType } from '../../types/Todo';

type TodoProps = {
  todo: TodoType;
};

export const Todo: React.FC<TodoProps> = memo(({ todo }) => {
  const { state } = useContext(AppContext);
  const { targetTodo } = state;
  // const [edited, setEdited] = useState(false);

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editRef.current) {
      editRef.current.focus();
    }
  }, []);
  // const handleTargetTodo = (todoId: number) => {
  //   dispatch({ type: 'SET_TARGET_TODO', payload: todoId });
  // };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
      // onDoubleClick={() => setEdited(true)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          // onchange on page and server?
        />
      </label>

      {targetTodo === todo.id ? (
        <form>
          <input
            ref={editRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todo.title}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            x
          </button>
        </>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});

Todo.displayName = 'Todo';
