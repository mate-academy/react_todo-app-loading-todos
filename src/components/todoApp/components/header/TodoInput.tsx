/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { DispatchContext, TodosContext } from '../../../../Store';
import { USER_ID, addTodo } from '../../../../api/todos';

export const TodoInput = () => {
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [inputText, setInputText] = useState('');
  const [toggleAll, setToggleAll] = useState(false);
  const allCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    dispatch({
      type: 'setToggleAll',
      payload: allCompleted,
    });
    setToggleAll(!toggleAll);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputText.trim()) {
      dispatch({ type: 'setError', payload: 'Title should not be empty' });
      const timeout = setTimeout(() => {
        dispatch({ type: 'setError', payload: null });
        clearTimeout(timeout);
      }, 3000);

      return;
    }

    const todo = {
      id: +new Date(),
      userId: USER_ID,
      title: inputText,
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: todo });
    dispatch({ type: 'loading', payload: { load: true, id: todo.id } });
    addTodo(todo)
      .catch(() => {
        dispatch({ type: 'setError', payload: 'Unable to add a todo' });
        dispatch({ type: 'deleteTodo', payload: todo.id });
      })
      .finally(() => {
        dispatch({ type: 'loading', payload: { load: false, id: todo.id } });
        setTimeout(() => {
          dispatch({ type: 'setError', payload: null });
        }, 3000);
      });
    setInputText('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: allCompleted,
          'is-hidden': !todos.length,
        })}
        data-cy="ToggleAllButton"
        onClick={handleToggleAll}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
