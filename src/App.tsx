import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoServise from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import classNames from 'classnames';

export enum TodoType {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const App: React.FC = () => {
  enum Error {
    loadError = 'Unable to load todos',
    titleError = 'Title should not be empty',
    addError = 'Unable to add a todo',
    deleteError = 'Unable to delete a todo',
    updateError = 'Unable to update a todo',
  }

  const [title, setTitle] = useState('');
  const [changedTitle, setChangedTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loadingTodos, setLoadingTodos] = useState<Todo[] | null>([]);
  const [todosType, setTodosType] = useState<TodoType>(TodoType.all);
  const [isAllTodoCompleted, setIsAllTodoCompleted] = useState(false);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  const [changingTodo, setChangingTodo] = useState<Todo | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<Error | undefined>(
    undefined,
  );

  useEffect(() => {
    todoServise
      .getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(() => {
        setErrorMessage(Error.loadError);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 3000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    todoServise.getTodos().then(fetchedTodos => {
      switch (todosType) {
        case TodoType.active:
          setTodos(fetchedTodos.filter(todo => !todo.completed));
          break;
        case TodoType.completed:
          setTodos(fetchedTodos.filter(todo => todo.completed));
          break;
        case TodoType.all:
        default:
          setTodos(fetchedTodos);
      }
    });

    setCompletedTodosCount(
      todos.length - todos.filter(todo => todo.completed).length,
    );
  }, [todos, todosType]);

  if (!todoServise.USER_ID) {
    return <UserWarning />;
  }

  const handleSubmitButton = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return setErrorMessage(Error.titleError);
    }

    setErrorMessage(undefined);

    todoServise
      .addTodos({ title, completed: false, userId: todoServise.USER_ID })
      .then(newTodo => {
        setTodos(currentTodos => {
          const updatedTodos = [newTodo, ...currentTodos];

          setLoadingTodos([newTodo]);

          return updatedTodos;
        });
      })
      .catch(error => {
        setErrorMessage(Error.addError);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 3000);
        throw error;
      })
      .then(() => setTitle(''))
      .finally(() => {
        setLoadingTodos(null);
      });
  };

  const completeTodo = (todoId: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );

    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (todoToUpdate) {
      setLoadingTodos([todoToUpdate]);
    }

    if (todoToUpdate) {
      todoServise
        .updateTodos({
          ...todoToUpdate,
          completed: !todoToUpdate.completed,
        })
        .then(() => {
          setTodos(updatedTodos);
        })
        .catch(() => {
          setErrorMessage(Error.updateError);
          setTimeout(() => {
            setErrorMessage(undefined);
          }, 3000);
        })
        .finally(() => {
          setLoadingTodos(null);
        });
    }
  };

  const handleToggleAllButton = () => {
    setIsAllTodoCompleted(!isAllTodoCompleted);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: isAllTodoCompleted,
    }));

    setLoadingTodos(
      todos.filter(todo => todo.completed !== isAllTodoCompleted),
    );

    updatedTodos.forEach(todo => {
      todoServise
        .updateTodos(todo)
        .then(() => {
          setTodos(updatedTodos);
        })
        .catch(() => {
          setErrorMessage(Error.updateError);
          setTimeout(() => {
            setErrorMessage(undefined);
          }, 3000);
        })
        .finally(() => {
          setLoadingTodos(null);
        });
    });
  };

  const deleteTodo = (todoId: number) => {
    setLoadingTodos(todos.filter(todo => todo.id === todoId));
    todoServise
      .deleteTodos(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => {
        setErrorMessage(Error.deleteError);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 3000);
      })
      .finally(() => {
        setLoadingTodos(null);
      });
  };

  const clearCompletedTodo = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    setLoadingTodos(completedTodos);

    completedTodos.forEach(completedTodo => {
      todoServise
        .deleteTodos(completedTodo.id)
        .then(() => {
          setTodos(currentTodos =>
            currentTodos.filter(todo => todo.id !== completedTodo.id),
          );
        })
        .catch(() => {
          setErrorMessage(Error.deleteError);
          setTimeout(() => {
            setErrorMessage(undefined);
          }, 3000);
        })
        .finally(() => {
          setLoadingTodos(null);
        });
    });
  };

  const handleTitleChange = (event: React.FormEvent, updatedTodo: Todo) => {
    event.preventDefault();

    if (changedTitle.trim() === '') {
      return setErrorMessage(Error.titleError);
    }

    setErrorMessage(undefined);

    const updatedTodoWithNewTitle = { ...updatedTodo, title: changedTitle };

    setLoadingTodos([updatedTodoWithNewTitle]);

    todoServise
      .updateTodos(updatedTodoWithNewTitle)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodoWithNewTitle : todo,
          ),
        );
        setChangingTodo(undefined);
        setChangedTitle('');
      })
      .catch(() => setErrorMessage(Error.updateError))
      .finally(() => {
        setLoadingTodos(null);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <Header
            todos={todos}
            handleToggleAllButton={handleToggleAllButton}
            handleSubmitButton={handleSubmitButton}
            title={title}
            setTitle={setTitle}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            changingTodo={changingTodo}
            setChangingTodo={setChangingTodo}
            changedTitle={changedTitle}
            setChangedTitle={setChangedTitle}
            deleteTodo={deleteTodo}
            handleTitleChange={handleTitleChange}
            loadingTodos={loadingTodos}
          />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <Footer
              completedTodosCount={completedTodosCount}
              todosType={todosType}
              setTodosType={setTodosType}
              clearCompletedTodo={clearCompletedTodo}
            />
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(undefined)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
