import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from '../api/todos';
import { USER_ID } from '../variables/UserID';
import { Todo } from '../types/Todo';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface TodoContext {
  todos: Todo[],
  addTodo: (todo: Todo, event: React.FormEvent<HTMLFormElement>) => void,
  setCompleted: (todoID: number) => void,
  setAllCompletedOrRemoveCompleted: (todos: Todo[]) => void,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  filteredTodosForList: Todo[],
  deleteCompletedTodos: () => void,
  deleteTodo: (id: number) => void,
  saveEditingTitle: (todoId: number, todoNewTitle: string) => void,
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
}

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  addTodo: () => { },
  setCompleted: () => { },
  setAllCompletedOrRemoveCompleted: () => { },
  query: '',
  setQuery: () => { },
  filteredTodosForList: [],
  deleteCompletedTodos: () => { },
  deleteTodo: () => { },
  saveEditingTitle: () => { },
  errorMessage: '',
  setErrorMessage: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('error');
        timeout = setTimeout(() => {
          setErrorMessage('');
          clearTimeout(timeout);
        }, 3000);
      });

    return () => clearTimeout(timeout);
  }, []);

  function addTodo(todo: Todo, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (todo.title.trim().length) {
      setTodos(prevTodos => [
        ...prevTodos,
        todo,
      ]);
    }
  }

  function setCompleted(todoID: number) {
    const changeCompletedTodos = todos.map(todo => {
      return todo.id === todoID
        ? { ...todo, completed: !todo.completed }
        : todo;
    });

    setTodos(changeCompletedTodos);
  }

  function chooseFilterForTodos(queryForFilter: string) {
    return todos.filter(todo => {
      switch (queryForFilter) {
        case Status.Active:
          return todo.completed === false;

        case Status.Completed:
          return todo.completed === true;

        default:
          return true;
      }
    });
  }

  const filteredTodosForList = chooseFilterForTodos(query);

  function saveEditingTitle(todoID: number, changedTitle: string) {
    let changedTodos = [...todos];

    if (changedTitle.trim()) {
      changedTodos = changedTodos.map(todo => (
        todo.id === todoID
          ? { ...todo, title: changedTitle }
          : todo));
    }

    setTodos(changedTodos);
  }

  function setAllCompletedOrRemoveCompleted(todosToComplete: Todo[]) {
    const checkForAllTodosCompleted = todosToComplete.every(
      todo => todo.completed === true,
    );

    let todosPrepare = [...todos];

    todosPrepare = todosPrepare.map(
      todo => (
        { ...todo, completed: !checkForAllTodosCompleted }
      ),
    );

    setTodos(todosPrepare);
  }

  function deleteTodo(todoID: number) {
    setTodos(todos.filter(todo => todo.id !== todoID));
  }

  function deleteCompletedTodos() {
    setTodos(todos.filter(todo => todo.completed === false));
  }

  const value = useMemo(() => ({
    todos,
    addTodo,
    setCompleted,
    setAllCompletedOrRemoveCompleted,
    query,
    setQuery,
    filteredTodosForList,
    deleteCompletedTodos,
    deleteTodo,
    saveEditingTitle,
    errorMessage,
    setErrorMessage,
  }), [todos, filteredTodosForList, query, errorMessage]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
