import React, { useContext, useRef, useState } from 'react';
import { postTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';

interface Props {
  addTodo: (newTodo: Todo) => void,
  selectAll: () => void,
  setError: (NewError: string) => void,
}

export const TodoHeader: React.FC<Props> = (props) => {
  const { addTodo, selectAll, setError } = props;
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todoTitle, setTodoTitle] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      setError('Can`t add todo with empty title');
    } else {
      const newTodo = await postTodos({
        userId: user?.id || 0,
        title: todoTitle.trim(),
        completed: false,
      });

      addTodo(newTodo);
    }

    setTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        aria-label="SELECT ALL"
        type="button"
        className="todoapp__toggle-all active"
        onClick={() => selectAll()}
      />

      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          value={todoTitle}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
