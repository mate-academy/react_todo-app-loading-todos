import cn from 'classnames';
import { useTodoContext } from '../../../Context/Context';
import { RemoveButton } from '../RemoveButton/RemoveButton';
import { TodoLoader } from '../TodoLoader/TodoLoader';

export const TodoForRender = () => {
  const { filteredList } = useTodoContext();

  return (
    <>
      {filteredList.map(({ title, completed, id }) => (
        <div
          key={id}
          data-cy="Todo"
          className={cn('todo',
            { completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            { title }
          </span>
          <RemoveButton />
          <TodoLoader />
        </div>
      ))}
    </>
  );
};
