/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isErrorLoad, setIsErrorLoad] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>(Filter.ALL);

  console.log('APP FILTER', selectedFilter);

  const filteredTodos = [...todos];

  const fetchData = useCallback(async () => {
    if (user) {
      try {
        const inData = await getTodos(user.id);

        console.log('INDATA', inData);

        setTodos(inData);
      } catch (inError) {
        console.log('ERROR input', inError);
        setIsErrorLoad(false);
      }
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  });

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  console.log('REDDERINGM APP');
  console.log('DODOS', todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        <TodoList
          todos={filteredTodos}
          selectedFilter={selectedFilter}
        />

        <Footer
          todos={todos}
          onSetFilterGlobal={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
      </div>

      <ErrorNotification isErrorLoad={isErrorLoad} />
    </div>
  );
};
