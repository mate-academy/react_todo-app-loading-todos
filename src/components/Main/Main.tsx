import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

type Props = {
  todos: Todo[],
  isLoaded: boolean
}

export const Main: React.FC<Props> = ({ todos, isLoaded }) => {

  return (
    <section className="todoapp__main" data-cy="TodoList">

    {todos.map(({title, completed, id}) => {
      return (
        <div
          data-cy="Todo"
          className={classNames(
            'todo',
            { completed }
          )}
          key={id}
        >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            defaultChecked
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">{title}</span>
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
        >
          ×
        </button>

        {!isLoaded
          &&
          <Loader />
        }
      </div>
      )
    })}

  </section>
  )
}
