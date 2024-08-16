import React, { useEffect, useState } from 'react';

import { Header } from './Components/Header/Header';
import { TodoList } from './Components/Main/TodoList';
import { Footer } from './Components/Footer/Footer';
import { ErrorMessage } from './Components/ErrorMessage/ErrorMessage';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { getTodos, createTodo, deleteTodo } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const areAllTodosCompleted = todos.every(todo => todo.completed);

  const [filter, setFilter] = useState<Filter>(Filter.All);

  const handleFilter = (filteringCriteria: Filter) => {
    setFilter(filteringCriteria);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
    setIsLoading(false);
  }, []);

  const onDelete = (id: number) => {
    deleteTodo(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const onAdd = (title: string) => {
    createTodo(title).then(result =>
      setTodos(prev => [...prev, { ...result }]),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header areAllTodosCompleted={areAllTodosCompleted} onAdd={onAdd} />
        {!!todos.length && (
          <>
            <TodoList
              isLoading={isLoading}
              todos={todos}
              filter={filter}
              onDelete={onDelete}
            />
            <Footer todos={todos} handleFilter={handleFilter} filter={filter} />
          </>
        )}
      </div>

      <ErrorMessage errorMessageText={errorMessage} />
    </div>
  );
};
