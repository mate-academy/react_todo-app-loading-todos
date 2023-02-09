import cn from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

export const TodoMain: React.FC<{ todos: Todo[] | null }> = ({ todos }) => {
  const [isEditActive, setIsEditActive] = useState<number>(-1);
  const [tempTitle, setTempTitle] = useState('');

  const onSubmitChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsEditActive(-1);
  };

  const activateEdit = (title: string, id: number) => {
    setTempTitle(title);
    setIsEditActive(id);
  };

  return (
    <section className="todoapp__main">
      {todos?.map((todo) => {
        const { completed, title, id } = todo;

        return (
          <div className={cn('todo', { completed })} key={id}>
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" checked />
            </label>

            {isEditActive === id ? (
              <>
                <form onSubmit={onSubmitChanges}>
                  <input
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={tempTitle}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setTempTitle(e.currentTarget.value);
                    }}
                  />
                </form>
              </>
            ) : (
              <>
                <span
                  className="todo__title"
                  onDoubleClick={() => activateEdit(title, id)}
                >
                  {title}
                </span>
                <button type="button" className="todo__remove">
                  ×
                </button>
              </>
            )}

            <div className={cn('modal overlay', { 'is-active': !todo })}>
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
