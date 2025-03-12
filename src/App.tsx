/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMassage } from './components/ErrorMassage';
import { Todo } from './types/Todo';

function filterTodos(todoArr: Todo[], filterData: string): Todo[] {
  if (filterData === 'Active') {
    return todoArr.filter(todo => !todo.completed);
  } else if (filterData === 'Completed') {
    return todoArr.filter(todo => todo.completed);
  }

  return todoArr;
}

function completedTodoCounter(todos: Todo[]): number {
  const notCompletedTodo = todos.filter(todo => !todo.completed);

  return notCompletedTodo.length;
}

export const App: React.FC = () => {
  const [errorMassage, setErrorMassage] = useState('');
  const [allTodos, setAllTodos] = useState<Todo[]>();
  const [filterData, setFilterData] = useState('All');
  const [todosCounter, setTodosCounter] = useState(0);

  useEffect(() => {
    getTodos()
      .then(response => {
        setAllTodos(response);
      })
      .catch(() => {
        setErrorMassage('Unable to load todos');
      });
  }, []);

  const hideError = () => {
    setErrorMassage('');
  };

  if (errorMassage.length > 0) {
    setTimeout(() => {
      setErrorMassage('');
    }, 3000);
  }

  const handleFilterData = (data: string) => {
    setFilterData(data);
  };

  const filteredTodos = allTodos ? filterTodos(allTodos, filterData) : [];

  useEffect(() => {
    if (allTodos) {
      setTodosCounter(completedTodoCounter(allTodos));
    }
  }, [allTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {filteredTodos && filteredTodos.length !== 0 && (
          <TodoList todos={filteredTodos} />
        )}
        {allTodos && allTodos.length !== 0 && (
          <Footer filterData={handleFilterData} todosCounter={todosCounter} />
        )}
      </div>
      <ErrorMassage errorMassage={errorMassage} hideError={hideError} />
    </div>
  );
};
