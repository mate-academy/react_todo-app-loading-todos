/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useContext, useMemo, useState } from 'react';
import * as todosService from '../../api/todos';

import { TodosContext } from '../../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    todos,
    setErrorMessage,
    setTodos,
    updateTodo,
  } = useContext(TodosContext);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    setErrorMessage('');
    const data = {
      title: inputValue,
      completed: false,
      userId: todosService.USER_ID,
    };

    setTodos(currentTodos => [...currentTodos, { ...data, id: 0 }]);

    try {
      const newTodo = await todosService.createTodo(data);

      setTodos(currentTodos => {
        currentTodos.pop();

        return [...currentTodos, newTodo];
      });
    } catch (error) {
      setErrorMessage('add');
      setTodos(currentTodos => {
        currentTodos.pop();

        return [...currentTodos];
      });
      throw error;
    } finally {
      setTimeout(() => setErrorMessage(''), 3000);
    }

    setInputValue('');
  };

  const completeAllTodos = async () => {
    let uncompletedTodos = [...todos].filter(todo => !todo.completed);

    if (uncompletedTodos.length < 1) {
      uncompletedTodos = [...todos].filter(todo => todo.completed);
    }

    const newTodos = await Promise.all(uncompletedTodos.map(todo => {
      return updateTodo({ ...todo, completed: !todo.completed });
    }));

    return newTodos;
  };

  const allCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          onClick={completeAllTodos}
          className={classNames(
            'todoapp__toggle-all',
            { active: allCompleted },
          )}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmitForm}>
        <input
          id="todoInput"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </form>
    </header>
  );
};
