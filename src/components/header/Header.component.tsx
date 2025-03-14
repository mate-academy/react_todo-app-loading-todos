import React, { useState } from 'react';
import { HeaderTypes } from './Header.types';
import { text } from '../../constants/text';
import { createTodo, USER_ID } from '../../api/todos';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

export const HeaderComponent: React.FC<HeaderTypes> = ({
  setTodos,
  setIsLoadingId,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    completed: false,
    userId: USER_ID,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    createTodo(formData)
      .then(newTodo => {
        setIsLoadingId(newTodo.id);
        setTodos(prevState => [...prevState, newTodo]);
      })
      .catch(e => console.log(e))
      .finally(() => setTimeout(() => setIsLoadingId(null), 400));
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        onClick={() => {}}
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder={text.whatNeedsToBeDone}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
