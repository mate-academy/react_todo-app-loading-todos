/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { deleteTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/ErrorMessage/ErrorMessage';

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [itemsLeft, setItemsLeft] = useState<number>(0);
  const [sortBy, setSortBy] = useState('all');
  const [errorMessage, setErrorMessage] = useState<string | null | boolean>(
    null,
  );
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);

  function handleDeleteTodo(id: number) {
    setDeleteTodoId(id);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    async function deleteTodoFromServer() {
      if (deleteTodoId !== null) {
        try {
          await deleteTodo(deleteTodoId);
        } catch {
          setErrorMessage('Unable to delete a todo');
          const timer = setTimeout(() => setErrorMessage(null), 3000);

          return () => clearTimeout(timer);
        }
      }
    }

    const cleanup = deleteTodoFromServer();

    return () => {
      if (cleanup instanceof Function) {
        cleanup();
      }
    };
  }, [deleteTodoId]);

  useEffect(() => {
    async function getTodosFromServer() {
      try {
        const todosFromServer = await getTodos();

        const numbersOfItemsLeft: number = todosFromServer.filter(
          todo => !todo.completed,
        ).length;

        setItemsLeft(numbersOfItemsLeft);
        setErrorMessage(null);

        switch (sortBy) {
          case 'all':
            setTodos(todosFromServer);
            break;
          case 'active':
            const sortedByActive: Todo[] = todosFromServer.filter(
              todo => !todo.completed,
            );

            setTodos(sortedByActive);
            break;
          case 'completed':
            const sortedByCompleted: Todo[] = todosFromServer.filter(
              todo => todo.completed,
            );

            setTodos(sortedByCompleted);
            break;
        }
      } catch {
        setErrorMessage('Unable to load todos');
        const timer = setTimeout(() => setErrorMessage(null), 3000);

        return () => clearTimeout(timer);
      }
    }

    getTodosFromServer();
  }, [sortBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header query={query} onInput={handleInput} />

        <TodoList onDeleteTodo={handleDeleteTodo} todos={todos} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            itemsLeft={itemsLeft}
            sortBy={sortBy}
            onSortBy={setSortBy}
            todos={todos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <Error errorMessage={errorMessage} onErrorMessage={setErrorMessage} />
    </div>
  );
};
