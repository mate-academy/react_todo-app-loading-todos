/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter, Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './components/Error/Error';

const USER_ID = 11861;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.all);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsErrorHidden(false);
      });
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filterBy) {
        case Filter.active:
          return !todo.completed;
        case Filter.completed:
          return todo.completed;
        default:
          return true;
      }
    })
  ), [filterBy, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length !== 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              selectedTodoId={selectedTodoId}
              setSelectedTodoId={setSelectedTodoId}
            />

            <Footer
              todos={todos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        )}

        {!isErrorHidden && (
          <ErrorMessage
            errorMessage={errorMessage}
            isErrorHidden={isErrorHidden}
            setIsErrorHidden={setIsErrorHidden}
          />
        )}
      </div>
    </div>
  );
};
