/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setTodoList:(todo: Todo[]) => void,
  todoList: Todo[],
  setError:(text: string) => void,
};

export const Header:React.FC<Props> = ({
  todoList,
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <header className="todoapp__header">
      {todoList.length !== 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};
