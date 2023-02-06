import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[] | null
};

export const Main: React.FC<Props> = ({ visibleTodos }) => {
  const [changeCheck, setChangeCheck] = useState<boolean>(false);

  const changeForm = () => {
    setChangeCheck(true);
  };

  const onSubmitChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChangeCheck(false);
  };

  return (
    <section className="todoapp__main">
      {visibleTodos?.map(todo => {
        const {
          completed,
          title,
        } = todo;

        return (
          <div className={classNames('todo', { completed })}>
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            {changeCheck
              ? (
                <>
                  <form onSubmit={onSubmitChanges}>
                    <input
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={title}
                    />
                  </form>
                </>
              )
              : (
                <>
                  <span
                    className="todo__title"
                    onDoubleClick={changeForm}
                  >
                    {title}
                  </span>
                  <button type="button" className="todo__remove">×</button>
                </>
              )}

            <div className={classNames(
              'modal overlay',
              { 'is-active': !todo },
            )}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
