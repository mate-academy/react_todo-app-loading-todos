/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { USER_ID } from './utils/UserId';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Field } from './types/Field';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/Error.Message';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedField, setSelectedField] = useState<Field>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [inputTitle, setInputTitle] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');

  const loadTodos = () => getTodos(USER_ID)
    .then(someTodos => {
      setTodos(someTodos);
    })
    .catch(() => setErrorMessage('Incorrect URL'));

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);

  let preparedTodos = [...todos];

  useMemo(() => {
    switch (selectedField) {
      case 'active':
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;

      default:
        preparedTodos = [...todos];
    }
  }, [todos, selectedField]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          inputTitle={inputTitle}
          loadTodos={loadTodos}
          setInputTitle={setInputTitle}
        />

        <TodoList
          preparedTodos={preparedTodos}
          setTodos={setTodos}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setErrorMessage={setErrorMessage}
          updatedTitle={updatedTitle}
          setUpdatedTitle={setUpdatedTitle}
          loadTodos={loadTodos}
        />

        {/* Hide the footer if there are no todos */}
        <Footer
          preparedTodos={preparedTodos}
          todos={todos}
          setSelectedField={setSelectedField}
          selectedField={selectedField}
          setTodos={setTodos}
        />
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
