/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { Options } from './types/Options';
import { Error } from './types/Errors';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const [selectedOption, setSelectedOption] = useState<Options>(Options.All);

  const filterTodos = (posts: Todo[], option: Options) => {
    switch (option) {
      case Options.Active:
        return posts.filter(post => !post.completed);

      case Options.Completed:
        return posts.filter(post => post.completed);

      default:
        return posts;
    }
  };

  const todoFilterSelectedOptions = filterTodos(todos, selectedOption);
  const todoFilterOptionActive = filterTodos(todos, Options.Active);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const showError = useCallback(
    (error: Error) => {
      setErrorMessage(error);

      setTimeout(() => {
        clearError();
      }, 3000);
    },
    [clearError],
  );

  useEffect(() => {
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => showError(Error.LoadTodos));
  }, [showError]);

  // function addTodo({ userId, title, completed }: Todo) {
  //   setErrorMessage();

  //   return todoService.createTodos({ userId, title, completed })
  //     .then(newTodo => {
  //       setTodos(currentTodo => [...currentTodo, newTodo]);
  //     })
  //     .catch((error) => {
  //       setErrorMessage();
  //       throw error;
  //     });
  // }

  // function deleteTodo(todoId: number) {
  //   setTodos(currentTodo => currentTodo.filter(todo => todo.id !== todoId));

  //   return todoService.deleteTodos(todoId)
  //     .catch((error) => {
  //       setTodos(todos)
  //       setErrorMessage();
  //       throw error;
  //     });
  // }

  // function updateTodo(updatedTodo: Todo) {
  //   setErrorMessage();

  //   return todoService.updateTodos(updatedTodo)
  //     .then(todo => {
  //       setTodos(currentTodo => {
  //         const newTodo = [...currentTodo];
  //         const index = newTodo.findIndex(todo => todo.id === updatedTodo.id);

  //         newTodo.splice(index, 1, todo);

  //         return newTodo;
  //     })
  //   })
  //   .catch((error) => {
  //     setErrorMessage();
  //     throw error
  //   });
  // }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header filteredTodo={todoFilterSelectedOptions} />

        <TodoList filteredTodo={todoFilterSelectedOptions} />

        {!!todos.length && (
          <Footer
            filteredTodo={todoFilterOptionActive}
            selected={selectedOption}
            setSelected={setSelectedOption}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorMessage errorMessage={errorMessage} clear={clearError} />
    </div>
  );
};
