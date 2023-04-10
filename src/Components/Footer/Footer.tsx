import classNames from 'classnames';
import { Links } from '../../utils/enum';
import { Todo } from '../../types/Todo';

type Props = {
  filteredBy: string,
  todosLengh: number,
  handleChange: (value: string) => void,
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({
  filteredBy,
  todosLengh,
  handleChange,
  todos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{`${todosLengh} items left`}</span>

      <nav className="filter">
        {Object.keys(Links).map((key) => (
          <a
            href="#/completed"
            className={classNames('filter__link',
              {
                selected: filteredBy === key,
              })}
            key={key}
            onClick={() => handleChange(key)}
          >
            {key}
          </a>
        ))}
      </nav>

      {todos.some((todo) => todo.completed) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
