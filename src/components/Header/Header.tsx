import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { addTodo } from '../../api/todos';

const USER_ID = 6344;

interface Props {
  hasAllActive: boolean;
  getData: () => void;
}

export const Header: React.FC<Props> = React.memo(
  ({ hasAllActive: hasActive, getData }) => {
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const handleNewTodoTitleChange = useCallback(
      (event:React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(event.target.value);
      }, [],
    );

    const handleNewTodoSubmit = useCallback(() => {
      const addTodoToServer = async () => {
        await addTodo(USER_ID, newTodoTitle);
        await getData();
      };

      addTodoToServer();
      setNewTodoTitle('');
    }, []);

    return (
      <header className="todoapp__header">
        <button
          aria-label="toogle_completed"
          type="button"
          className={cn('todoapp__toggle-all', {
            active: hasActive,
          })}
        />

        <form onSubmit={handleNewTodoSubmit}>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleNewTodoTitleChange}
          />
        </form>
      </header>
    );
  },
);
