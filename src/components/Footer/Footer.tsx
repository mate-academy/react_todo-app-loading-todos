import { useContext, FC } from 'react';
import { DispatchContext, StateContext } from '../../store/todoReducer';
import { Action } from '../../types/actions';
import { deleteTodo } from '../../api/todos';
import { filterAction } from '../../constants/filterActions';

type Props = {
  onError: (message: string) => void;
  onCoverShow: React.Dispatch<React.SetStateAction<number[]>>;
};

export const Footer: FC<Props> = ({ onError, onCoverShow }) => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isActiveTodo = todos.some(todo => todo.completed);

  const status = todos.filter(todo => !todo.completed);

  const handleCleareCompleted = () => {
    const completedTodo = todos.filter(todo => todo.completed);
    const arrOfId = completedTodo.map(todo => todo.id);

    onCoverShow(arrOfId);

    completedTodo.forEach(todo => {
      deleteTodo(todo.id)
        .then(() => {
          dispatch({ type: Action.deleteTodo, payload: todo.id });
        })
        .catch(() => {
          onError('Unable to delete a todo');
        })
        .finally(() => {
          onCoverShow([]);
        });
    });
  };

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${status.length} ${status.length === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterAction.map(filterAct => (
          <a
            key={filterAct.title}
            href="#/"
            className={`filter__link ${filter === filterAct.action && 'selected'}`}
            data-cy={`FilterLink${filterAct.title}`}
            onClick={() =>
              dispatch({
                type: Action.changeFiilter,
                payload: filterAct.action,
              })
            }
          >
            {filterAct.title}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        {...(!isActiveTodo && {
          style: { opacity: 0 },
        })}
        {...(!isActiveTodo && { disabled: true })}
        onClick={() => handleCleareCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
