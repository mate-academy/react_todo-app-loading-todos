import classNames from 'classnames';
import { useState } from 'react';
import { client } from '../utils/fetchClient';
// import { Todo } from '../types/Todo';

export const TodoCreate = ({
  setErrorMessage,
  clearCompleted,
  askTodos,
  countComplited,
}: {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  clearCompleted: () => void
  askTodos: (url: string) => void
  countComplited: boolean
}) => {
  const [inputPlace, setInputPlace] = useState('');

  const handleNewTodo = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      client.post('/todos',
        {
          title: inputPlace,
          userId: 6757,
          completed: false,
        })
        .finally(() => {
          askTodos('/todos?userId=6757');
          setInputPlace('');
        })
        .catch(() => setErrorMessage('Unable to add a todo'));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlace(event.currentTarget.value);
  };

  return (
    <>
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: countComplited },
        )}
        onClick={clearCompleted}
      >
        {}

      </button>

      <form>
        <input
          type="text"
          value={inputPlace}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onKeyDown={handleNewTodo}
          onChange={handleChange}
        />
      </form>
    </>
  );
};
