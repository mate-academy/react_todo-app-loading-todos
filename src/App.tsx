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
      .then(serverTodos => {
        setTodos(
          serverTodos.map(todo => ({
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
    postTodo({ title: newPostTitle, userId: USER_ID, completed: false }).then(
      newTodo => {
        setTodos(prevTodos => [...prevTodos, { ...newTodo, isFake: false }]);
      },
    );
  }

  const displayTodos = todos.filter(
    ({ completed }) => completeFilter === null || completed !== completeFilter,
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todos</h1>
      <div className="todoapp__content">
        <TodoForm
          todos={todos}
          addTodo={addTodo}
          setFailCaseStates={setFailCaseStates}
        />
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
