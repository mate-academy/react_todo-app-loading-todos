import { useContext } from 'react';
import { Select } from '../types/Select';
import { DispatchContext, StateContext } from './MainContext';
import { Todo } from '../types/Todo';
import { ActionTypes } from '../types/ActionTypes';

const filterValues = [
  {
    id: 0,
    title: Select.ALL,
    'data-cy': 'FilterLinkAll',
    link: '#/',
  },
  {
    id: 1,
    title: Select.ACTIVE,
    'data-cy': 'FilterLinkActive',
    link: '#/active',
  },
  {
    id: 2,
    title: Select.COMPLETED,
    'data-cy': 'FilterLinkCompleted',
    link: '#/completed',
  },
];

const getItemsLeft = (todosList: Todo[]): number => {
  return todosList.filter(todo => !todo.completed).length;
};

export const TodoFilter = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const itemsLeft = getItemsLeft(todos);

  return (
    // {/* Hide the footer if there are no todos */}
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterValues.map(value => (
          <a
            href={value.link}
            className="filter__link selected"
            data-cy={value['data-cy']}
            key={value.id}
            onClick={() =>
              dispatch({
                type: ActionTypes.SetTypeOfFilter,
                payload: value.title,
              })
            }
          >
            {value.title}
          </a>
        ))}

        {/* <a href="#/" className="filter__link selected" data-cy="FilterLinkAll">
          All
        </a>

        <a href="#/active" className="filter__link" data-cy="FilterLinkActive">
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a> */}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
