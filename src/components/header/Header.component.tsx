import React, { useEffect, useRef, useState } from 'react';
import { HeaderTypes } from './Header.types';
import { text } from '../../constants/text';
import { createTodo, updateTodo, USER_ID } from '../../api/todos';

export const HeaderComponent: React.FC<HeaderTypes> = ({
  todos,
  setTodos,
  handleLoading,
  setError,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    completed: false,
    userId: USER_ID,
  });

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const reset = () => {
    setFormData(prevState => ({
      ...prevState,
      title: '',
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleLoading(-1);

    event.preventDefault();
    setError('');

    createTodo(formData)
      .then(newTodo => {
        setTodos(prevState => [...prevState, newTodo]);
      })
      .catch(e => setError(`error creating todo: ${e}`))
      .finally(() => handleLoading(-1));

    reset();
  };

  const handleHeaderButton = () => {
    const isCompletedAll = todos.every(isCompleted => isCompleted.completed);

    const updatedTodos = todos.map(currentTodo => ({
      ...currentTodo,
      completed: !isCompletedAll,
    }));

    updatedTodos.forEach(todo => handleLoading(todo.id));

    const promises = updatedTodos.map(promiseTodo => {
      return updateTodo(promiseTodo.id, promiseTodo);
    });

    Promise.all(promises)
      .then(setTodos)
      .catch(e => console.log(e))
      .finally(() => {
        updatedTodos.forEach(todo => handleLoading(todo.id));
      });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        onClick={handleHeaderButton}
        type="button"
        className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={titleField}
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
