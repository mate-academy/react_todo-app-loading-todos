/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';

import { Todo } from './types/Todo';
import { Filter } from './types/Filters';
import { UserWarning } from './UserWarning';
import { createTodo, USER_ID, getTodos } from './api/todos';
import { Header } from './components/header';
import { TodoList } from './components/todoList';
import { Footer } from './components/footer';
import { Error } from './components/error';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.all);

  function getVisibleTodos(filter: Filter) {
    switch (filter) {
      case Filter.active:
        return todos.filter(todo => !todo.completed);
      case Filter.completed:
        return todos.filter(todo => todo.completed);
      case Filter.all:
      default:
        return todos;
    }
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setErrorMessage(''))
  }, []);
 
  const allActive = useMemo(() => {
    return todos.every(todo => todo.completed)
  }, [todos])

  const active = useMemo(() => {
    return todos.filter(todo => !todo.completed)
  }, [todos])

  const completed = useMemo(() => {
    return todos.filter(todo => todo.completed)
  }, [todos])

  function addTodo({ userId, title, completed }: Todo) {
    createTodo({ userId, title, completed })
      .then(newTodo => setTodos(currentTodos => [...currentTodos, newTodo]))
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
          addTodo={addTodo}
          allActive={allActive}
          setErrorMessage={setErrorMessage}
        />

        {todos && (
          <>
            <TodoList
              visibleTodos={getVisibleTodos(filter)}
            />
        
            <Footer
              setFilter={setFilter}
              filter={filter}
              active={active}
              completed={completed}
            />
          </>
        )}
      </div>
      <Error
        errorMessage={errorMessage}
      />
    </div>
  );
};
