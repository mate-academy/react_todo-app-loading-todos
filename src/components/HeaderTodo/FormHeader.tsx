/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line jsx-a11y/label-has-associated-control
import React, { FC, useContext, useState } from 'react';
import { TodoContext, TodoDispatch } from '../../Context/TodoContext';
import { USER_ID, addTodo } from '../../api/todos';

interface IProps {
  showError: (err: string) => void;
}

export const FormHeader: FC<IProps> = ({ showError }) => {
  const [text, setNewTodo] = useState('');
  const { inputRef } = useContext(TodoContext);
  const dispatch = useContext(TodoDispatch);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTodo = text.trim();

    if (trimmedTodo !== '') {
      const newTodo = {
        id: crypto.randomUUID(),
        userId: USER_ID,
        title: text.trim(),
        completed: false,
      };

      try {
        await addTodo(newTodo).then(todo => {
          dispatch({ type: 'ADD_TODO', payload: todo });
          setNewTodo('');
        });
      } catch (error) {
        showError('Unable to add a todo');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="NewTodo">
        <input
          id="NewTodo"
          data-cy="NewTodoField"
          type="text"
          title="Write new todo"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={text}
          onChange={e => setNewTodo(e.target.value)}
        />
      </label>
    </form>
  );
};
