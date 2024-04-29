/* eslint-disable jsx-a11y/l  abel-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { USER_ID, getTodos, postTodo } from './api/todos';

import ErrorNotification from './components/ErrorNotification';
import { LocalTodosArrayType } from './types/Todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodosFooter from './components/TodosFooter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<LocalTodosArrayType>([]);
  const [failCaseStates, setFailCaseStates] = useState<{}>({
    todoLoad: false,
    titleLength: false,
    addTodo: false,
    deleteTodo: false,
    updateTodo: false,
  });
  const [completeFilter, setCompleteFilter] = useState<null | boolean>(null);

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodos(
          todos.map(todo => ({
            ...todo,
            isFromServer: true,
          })),
        );
        setFailCaseStates(prevCases => ({ ...prevCases, todoLoad: false }));
      })
      .catch(() => {
        setFailCaseStates(prevCases => ({ ...prevCases, todoLoad: true }));
      });
  }, []);

  function addTodo(newPostTitle: string) {
    if (newPostTitle.trim() === '') {
      setFailCaseStates(prevCases => ({
        ...prevCases,
        titleLength: true,
      }));
    } else {
      postTodo({ title: newPostTitle, userId: USER_ID, completed: false }).then(
        newTodo => {
          setTodos(prevTodos => [{ ...newTodo, isFake: false }, ...prevTodos]);
        },
      );

      setFailCaseStates(prevCases => ({
        ...prevCases,
        titleLength: false,
      }));
    }
  }

  const displayTodos = todos.filter(
    ({ completed }) => completeFilter === null || completed !== completeFilter,
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todos</h1>
      <div className="todoapp__content">
        <TodoForm displayTodos={displayTodos} addTodo={addTodo} />
        <TodoList displayTodos={displayTodos} />
        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <TodosFooter
            todos={todos}
            completeFilter={completeFilter}
            setCompleteFilter={setCompleteFilter}
          />
        )}
      </div>
      <ErrorNotification
        failCaseStates={failCaseStates}
        setFailCaseStates={setFailCaseStates}
      />
    </div>
  );
};
