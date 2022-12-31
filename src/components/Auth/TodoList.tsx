import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filteredList: Todo[] | undefined;
  completedTodo: Todo;
  handleCompletedTodo: () => void;
};

export const TodoList: React.FC<Props> = ({
  filteredList,
  completedTodo,
  handleCompletedTodo,
}) => {
  const [savedId, setsavedId] = useState(0);

  return (
    <ul>
      {filteredList
        && filteredList.map((todo) => (
          <section className="todoapp__main" data-cy="TodoList">
            <li key={todo.id}>
              <div
                data-cy="Todo"
                className={todo.completed ? 'todo completed' : 'todo'}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    defaultChecked
                    onClick={() => {
                      handleCompletedTodo();
                      // eslint-disable-next-line no-param-reassign
                      todo.completed = !(todo.id === savedId && completedTodo);
                      setsavedId(todo.id);
                    }}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDeleteButton"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div
                    className="
                          modal-background
                          has-background-white-ter"
                  />
                  <div className="loader" />
                </div>
              </div>
            </li>
            {' '}
          </section>
        ))}
    </ul>
  );
};
