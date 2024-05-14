/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext, useState } from 'react';
import classNames from 'classnames';

import { LoaderTodo } from '../Loader/LoaderTodo';
import { TodoDispatch } from '../../Context/TodoContext';
import { FilterContext } from '../../Context/FilterContext';
import { ButtonMain } from './ButtonMain';
import { FormMain } from './FormMain';

type TProps = {
  creating: boolean;
  showError: (err: string) => void;
};

export const MainTodo: FC<TProps> = ({ creating, showError }) => {
  const [editableTodoId, setEditableTodoId] = useState<string | null>(null);
  const { filteredTodos } = useContext(FilterContext);
  const dispatch = useContext(TodoDispatch);

  const handleDoubleClick = (id: string, title: string) => {
    setEditableTodoId(id);

    dispatch({ type: 'EDIT_CONFIG_TODO', payload: { id, title } });
  };

  const checkTodo = (id: string) => {
    dispatch({ type: 'CHECK_TODO', payload: id });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        const { title, completed, id } = todo;
        const isEditable = editableTodoId === id;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: completed })}
            title="Change"
            key={id}
          >
            {creating && <LoaderTodo />}

            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
                onChange={() => checkTodo(id)}
              />
            </label>

            {creating && <LoaderTodo />}

            {isEditable ? (
              <>
                <FormMain
                  id={id}
                  title={title}
                  setEditableTodoId={() => setEditableTodoId(null)}
                  showError={showError}
                />
              </>
            ) : (
              <>
                {creating && <LoaderTodo />}
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(id, title)}
                >
                  {title}
                </span>
                <ButtonMain id={id} showError={showError} />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};
