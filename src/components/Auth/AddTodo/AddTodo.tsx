import {
  ChangeEvent, FormEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { addTodo, updateTodo } from '../../../api/todos';
import { TodoContext } from '../../../context/TodoContext';
import { Error } from '../../../types/Error';
import { AuthContext } from '../AuthContext';

export const AddTodo: React.FC = () => {
  const {
    setTodos,
    handleFilter,
    filterState,
    todos,
    setLoadError,
    setErrorMessage,
    setToggleLoader,
  } = useContext(TodoContext);

  const user = useContext(AuthContext);

  const newTodoField = useRef<HTMLInputElement>(null);
  const [todoField, setTodoField] = useState('');
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

  const addTodoToTheServer = async () => {
    try {
      if (user) {
        const newTodo = {
          userId: user.id,
          title: todoField,
          completed: false,
        };

        const newOne = await addTodo(user.id, newTodo);

        const todoWhithOut0 = todos.filter(item => item.id !== 0);

        setTodos([...todoWhithOut0, newOne]);
        handleFilter(filterState, [...todoWhithOut0, newOne]);
      }
    } catch (_) {
      setLoadError(true);
      setErrorMessage(Error.add);
      handleFilter(filterState, todos);
      setTodos(todos);
    } finally {
      setTodoField('');
      setActiveTodoField(true);
    }
  };

  const addTodoToTheList = () => {
    if (user) {
      const newTodo = {
        id: 0,
        userId: user.id,
        title: todoField,
        completed: false,

      };

      setTodos((oldState) => {
        return [...oldState, newTodo];
      });
      handleFilter(filterState, [...todos, newTodo]);
    }
  };

  const handleNewTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoField.trim() !== '') {
      setActiveTodoField(false);
      addTodoToTheList();
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
      await Promise.all(
        todos.map(async (item) => {
          const completeTodo = { ...item };

          if (todos.some(item2 => !item2.completed)) {
            completeTodo.completed = true;
          } else {
            completeTodo.completed = false;
          }

          await updateTodo(item.id, completeTodo);
        }),
      );

      const newTodo = todos.map(item => {
        const toggleTodo = { ...item };

        if (todos.some(item2 => !item2.completed)) {
          toggleTodo.completed = true;

          return toggleTodo;
        }

        toggleTodo.completed = false;

        return toggleTodo;
      });

      setTodos(newTodo);
      handleFilter(filterState, newTodo);
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
