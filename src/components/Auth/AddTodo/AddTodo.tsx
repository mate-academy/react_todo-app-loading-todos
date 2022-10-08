import {
  ChangeEvent, FormEvent, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { addTodo, updateTodo } from '../../../api/todos';
import { TodoContext } from '../../../context/TodoContext';
import { Error } from '../../../types/Error';
import { AuthContext } from '../AuthContext';

export const AddTodo: React.FC = () => {
  const {
    setTodos,
    todos,
    setLoadError,
    setErrorMessage,
    setToggleLoader,
    todoField,
    setTodoField,
    setShowLoadingTodo,
  } = useContext(TodoContext);

  const user = useContext(AuthContext);

  const newTodoField = useRef<HTMLInputElement>(null);
  const [activeTodoField, setActiveTodoField] = useState(true);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (newTodoField.current && activeTodoField) {
      newTodoField.current.focus();
    }
  }, [activeTodoField]);

  const addTodoToTheServer = useCallback(async () => {
    try {
      if (user) {
        setShowLoadingTodo(true);
        const newTodo = {
          userId: user.id,
          title: todoField,
          completed: false,
        };

        const newOne = await addTodo(user.id, newTodo);

        setTodos((oldState) => [...oldState, newOne]);
      }
    } catch (_) {
      setLoadError(true);
      setErrorMessage(Error.add);
    } finally {
      setTodoField('');
      setActiveTodoField(true);
      setShowLoadingTodo(false);
    }
  }, [user, todoField]);

  const handleNewTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoField.trim() !== '') {
      setActiveTodoField(false);
      addTodoToTheServer();
    } else {
      setErrorMessage(Error.empty);
      setLoadError(true);
    }
  };

  const handleInputField = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoField(event.target.value);
  };

  const handleToggleAll = async () => {
    try {
      setToggleLoader(true);
      const statusToSet = todos.some(item2 => !item2.completed);
      const newTodos = [...todos];

      await Promise.all(
        todos.map(async (item, index) => {
          const completeTodo = { ...item };

          completeTodo.completed = statusToSet;
          newTodos[index].completed = statusToSet;

          await updateTodo(item.id, completeTodo);
        }),
      );

      setTodos(newTodos);
    } catch (_) {
      setLoadError(true);
      setErrorMessage(Error.update);
    } finally {
      setToggleLoader(false);
    }
  };

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="Add user"
        onClick={handleToggleAll}
      />

      <form onSubmit={handleNewTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={todoField}
          onChange={handleInputField}
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={!activeTodoField}
        />
      </form>
    </header>
  );
};
