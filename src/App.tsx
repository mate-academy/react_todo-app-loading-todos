import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, addTodo } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/Todo';
import { ErrorMessage } from './components/ErrorMessage';

export enum TypeFilter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('All');

  const listOfActiveTodos = todosList.filter(todo => !todo.completed).length;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    getTodos()
      .then(setTodosList)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        timeoutId = setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  function deletePost(postId: number): Promise<void> {
    return deleteTodo(postId).then(() =>
      setTodosList(todos => todos.filter(todo => todo.id !== postId)),
    );
  }

  function addPost(newTodo: Omit<Todo, 'id'>): Promise<void> {
    return addTodo(newTodo).then(nT => {
      setTodosList(currentTodos => [...currentTodos, nT]);
    });
  }

  const filteredList = () => {
    switch (filter) {
      case TypeFilter.Active:
        return todosList.filter(todo => !todo.completed);
      case TypeFilter.Completed:
        return todosList.filter(todo => todo.completed);
      default:
        return todosList;
    }
  };

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header addPost={addPost} />

        <TodoList todos={filteredList()} deletePost={deletePost} />

        {/* Hide the footer if there are no todos */}
        {todosList.length !== 0 && (
          <TodoFooter
            setFilter={setFilter}
            filter={filter}
            listOfActiveTodos={listOfActiveTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
