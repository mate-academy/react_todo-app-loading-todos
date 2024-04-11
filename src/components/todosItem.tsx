/* eslint-disable jsx-a11y/label-has-associated-control */

import { useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './todosContext';
import { ActiveContext, AllContext, CompletedContext } from './filterContext';
import { ManageCheckboxContext } from './manageCheckboxContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface ItemProps {
  item: Todo;
}

export const TodosItem: React.FC<ItemProps> = ({ item }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { isAllSelected } = useContext(AllContext);
  const { isActiveSelected } = useContext(ActiveContext);
  const { isCompletedSelected } = useContext(CompletedContext);
  const { setIsChecked } = useContext(ManageCheckboxContext);

  if (todos.every(element => element.completed === true)) {
    setIsChecked(true);
  } else {
    setIsChecked(false);
  }

  const changePersonalComplete = () => {
    return todos.map(elem => {
      if (elem.id === item.id) {
        return {
          ...elem,
          completed: !item.completed,
        };
      }

      return elem;
    });
  };

  const toRender = () => {
    if (isAllSelected === true) {
      return true;
    } else if (isActiveSelected === true && item.completed === false) {
      return true;
    } else if (isCompletedSelected === true && item.completed === true) {
      return true;
    } else {
      return;
    }
  };

  return (
    <>
      {toRender() === true && (
        <li>
          <div
            data-cy="Todo"
            className={`todo ${item.completed && 'completed'}`}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                onChange={() => setTodos(changePersonalComplete())}
                checked={item.completed}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {item.title}
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </li>
      )}
    </>
  );
};
