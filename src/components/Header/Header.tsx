import React, { useCallback, useState } from 'react';
import { addTodo } from '../../api/todos';

const USER_ID = 6344;

interface Props {
  hasActive: boolean;
  getData: () => void;
}

export const Header: React.FC<Props> = ({ hasActive, getData }) => {
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
      {hasActive && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button type="button" className="todoapp__toggle-all active" />
      )}

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
};
