import classNames from 'classnames';
import { useState } from 'react';
import { Filter } from '../../../types/Filter';
import { Todo } from '../../../types/Todo';

type Props = {
  todos: Todo[],
  setTodo: (currentTodo: Todo[]) => void,
};

const FILTER_MODE = [Filter.all, Filter.active, Filter.completed];

export const TodoFilter: React.FC<Props> = ({ setTodo, todos }) => {
  const [filterMode, setFilterMode] = useState(Filter.all);

  const getFilteredTodo = async (filter: Filter) => {
    let filteredTodos: Todo[] = [];

    switch (filter) {
      case Filter.all:
        filteredTodos = todos;
        break;

      case Filter.active:
        filteredTodos = todos.filter(currentTodo => !currentTodo.completed);
        break;

      case Filter.completed:
        filteredTodos = todos.filter(currentTodo => currentTodo.completed);
        break;

      default:
        break;
    }

    setTodo(filteredTodos);
  };

  const handleSetFilter = (filter: Filter) => {
    setFilterMode(filter);
    getFilteredTodo(filter);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      {FILTER_MODE.map(currentFilter => {
        const textFilter = capitalizeFirstLetter(currentFilter);

        return (
          <ul className="filters">
            <li>
              <a
                href={`#${currentFilter === Filter.all ? '/' : `/${currentFilter}`}`}
                className={classNames('filter__link', {
                  selected: (filterMode === Filter[currentFilter]),
                })}
                onClick={() => handleSetFilter(Filter[currentFilter])}
              >
                {textFilter}
              </a>
            </li>
          </ul>
        );
      })}
    </>
  );
};
