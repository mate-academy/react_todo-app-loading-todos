import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filteredList: Todo[] | undefined;
  completedTodo: Todo;
  handleCompletedTodo: (
    savedId: number,

    todo: Todo,
    setsavedId: (value: React.SetStateAction<number>) => void
  ) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredList,

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
                      handleCompletedTodo(
                        savedId,

                        todo,
                        setsavedId,
                      );
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
