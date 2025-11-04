import React, { useEffect, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

import { QueryType } from './types/QueryType';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessageType } from './types/ErrorMessageType';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [query, setQuery] = useState<QueryType>(QueryType.All);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(
    ErrorMessageType.NONE,
  );
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const notCompletedTodosCount = todos.filter(todo => !todo.completed).length;

  const addTodo = () => {
    if (!title) {
      return;
    }

    const id = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: id,
      userId: USER_ID,
      title: title,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    if (!title) {
      setErrorMessage(ErrorMessageType.TITLE);
      setTimeout(() => {
        setErrorMessage(ErrorMessageType.NONE);
      }, 3000);
    }

    addTodo();
    setTitle('');
  };

  const handleDoubleClick = (todo: Todo) => {
    setSelectedTitle(todo.title);
    setSelected(todo.id);
  };

  useEffect(() => {
    const filterTodos = (todosArg: Todo[], queryArg: QueryType) => {
      setVisibleTodos(() =>
        todosArg.filter(todo => {
          switch (queryArg) {
            case QueryType.Active:
              return !todo.completed;
            case QueryType.Completed:
              return todo.completed;
          }

          return todos;
        }),
      );
    };

    filterTodos(todos, query);
  }, [query, todos]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        setErrorMessage(ErrorMessageType.NONE);

        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage(ErrorMessageType.LOAD);
        setTimeout(() => {
          setErrorMessage(ErrorMessageType.NONE);
        }, 3000);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          title={title}
          handleSubmit={handleSubmit}
          handleTitleChange={setTitle}
          notCompletedTodosCount={notCompletedTodosCount}
          isSubmitting={isSubmitting}
        />
        <TodoList
          todos={visibleTodos}
          loading={loading}
          selected={selected}
          handleDoubleClick={handleDoubleClick}
          isSubmitting={isSubmitting}
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
        ></TodoList>

        {todos.length && (
          <Footer
            isSubmitting={isSubmitting}
            notCompletedTodosCount={notCompletedTodosCount}
            query={query}
            setQuery={setQuery}
          ></Footer>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      ></ErrorNotification>
    </div>
  );
};
