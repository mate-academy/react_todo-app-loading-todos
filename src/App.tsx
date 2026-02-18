import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  getTodos,
  USER_ID,
  deleteTodo as deleteTodoAPI,
  addTodo,
} from './api/todos';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoItem } from './components/TodoItem';
import { Status } from './types/StatusType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);
  const [loading, setLoading] = useState(true);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (errorMessage) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const id = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      timeoutRef.current = id;
    }
  }, [errorMessage]);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function filterTodos(status: Status) {
    if (status === Status.Active) {
      return todos.filter(todo => !todo.completed);
    } else if (status === Status.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  const visibleTodos = filterTodos(filterStatus);

  const deleteTodo = (postId: number) => {
    const currentTodos = [...todos];

    deleteTodoAPI(postId).catch(error => {
      setTodos(currentTodos);
      setErrorMessage('Unable to delete a todo');
      throw error;
    });

    setTodos(currentPosts => currentPosts.filter(post => post.id !== postId));
  };

  function handleCheckedId(id: number) {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (inputValue.trim().length < 1) {
      setErrorMessage('Title should not be empty');
      return;
    }

    const todo = {
      userId: USER_ID,
      title: inputValue,
      completed: false,
    };

    addTodo(todo)
      .then(newPost => {
        setTodos(currentTodos => [...currentTodos, newPost as Todo]);
        setErrorMessage(null);
        setInputValue('');
      })
      .catch(err => {
        setErrorMessage('Unable to add todo');
        throw err;
      });
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleSubmitForm}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInput}
            />
          </form>
        </header>


        {!loading && todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onToggleComplete={handleCheckedId}
              />
            ))}
          </section>
        )}

        {!loading && todos.length > 0 && (
          <Footer
            todos={todos}
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
