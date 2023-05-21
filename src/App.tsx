/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useState, FormEvent, useMemo,
} from 'react';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { client } from './utils/client';

const USER_ID = 10377;

function getRandomNumber(): number {
  const generatedNumbers: number[] = [];
  const maxAttempts = 1000;

  for (let i = 0; i < maxAttempts; i += 1) {
    const randomNumber = Math.floor(Math.random() * 1001);

    if (!generatedNumbers.includes(randomNumber)) {
      generatedNumbers.push(randomNumber);

      return randomNumber;
    }
  }

  return 0;
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [selectedTab, setSelectedTab] = useState('All');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThereActiveTodo, setIsThereActiveTodo] = useState(false);
  const [isThereCompletedTodos, setIsThereCompletedTodos] = useState(false);
  const [isAddingTodoAllowed, setIsAddingTodoAllowed] = useState(false);
  const [isDeleteingTodoAllowed, setIsDeleteingTodoAllowed] = useState(false);
  const [isEditingTodoAllowed, setIsEditingTodoAllowed] = useState(false);
  const [numberOfActiveTodos, setNumberOfActivTodos] = useState(0);
  const [errorMessageField, setErrorMessageField] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    userId: 10377,
    completed: false,
    id: getRandomNumber(),
  });

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      event.preventDefault();

      const updatedObjectTitle = {
        ...newTodo,
        title: event.target.value,
        id: getRandomNumber(),
      };

      setNewTodo(updatedObjectTitle);
      setTodo([...todo, updatedObjectTitle]);

      const resetedTitle = {
        ...newTodo,
        title: '',
        id: 0,
      };

      setNewTodo(resetedTitle);

      setInputValue(resetedTitle.title);

      try {
        await client.post('/todos', updatedObjectTitle);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }

    if (event.key === 'Enter' && inputValue.trim() === '') {
      setIsAddingTodoAllowed(true);
      setErrorMessageField(true);
    }
  };

  const deleteTodo = async (id: number) => {
    const newTodos = todo.filter((element) => {
      return element.id !== id;
    });

    if (newTodos === todo) {
      setIsDeleteingTodoAllowed(true);
      setErrorMessageField(true);
    }

    setTodo(newTodos);

    try {
      await client.delete(`/todos/${id}`);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const changeAll = () => {
    const chnagedArr = todo.map((element) => {
      return {
        ...element,
        completed: !element.completed,
      };
    });

    setTodo(chnagedArr);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const searchTodo = async (id: number) => {
    const updatedTodo = todo.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          completed: !obj.completed,
        };
      }

      return obj;
    });

    const none = todo.some((element) => {
      return element.id === id;
    });

    if (!none) {
      setIsEditingTodoAllowed(true);
      setErrorMessageField(true);
    }

    setTodo(updatedTodo);

    try {
      const todoToUpdate = todo.find((elem) => elem.id === id);

      if (todoToUpdate) {
        await client.patch(`/todos/${id}`, { completed: !todoToUpdate.completed });
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const resetEverything = () => {
    const onlyActives = todo.filter((obj) => {
      return obj.completed === false;
    });

    setTodo(onlyActives);
  };

  useEffect(() => {
    async function getTodo() {
      try {
        setIsLoading(true);

        const fetchedData = await getTodos(10377);

        setTodo(fetchedData);
      } catch (error) {
        console.error('Error occurred:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }

    const isActive = todo.some((obj) => obj.completed === false);
    const isFalse = todo.some((obj) => obj.completed === true);
    const todoLength = todo.filter((obj) => {
      return obj.completed === false;
    });

    setIsThereActiveTodo(isActive);
    setIsThereCompletedTodos(isFalse);
    setNumberOfActivTodos(todoLength.length);

    getTodo();
  }, [newTodo, todo]);

  const visibleTodos: Todo[] = useMemo(() => todo.filter((element) => {
    switch (selectedTab) {
      case 'Completed':
        return element.completed === true;
      case 'Active':
        return element.completed === false;
      case 'All':
        return todo;
      default:
        return todo;
    }
  }), [todo, newTodo.completed, selectedTab]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            <button
              type="button"
              className={isThereActiveTodo
                ? 'todoapp__toggle-all active'
                : 'todoapp__toggle-all'}
              onClick={changeAll}
            />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyPress={handleKeyPress}
              />
            </form>
          </header>
          {newTodo.title}
          <section className="todoapp__main">
            {todo.length > 0 && (
              <>
                {visibleTodos.map((task) => {
                  if (!isLoading) {
                    return (
                      <div
                        className={task.completed
                          ? 'todo completed'
                          : 'todo'}
                        key={task.id}
                      >
                        <label className="todo__status-label" key={task.id}>
                          <input
                            type="checkbox"
                            className="todo__status todo__title-field"
                            value={newTodo.title}
                            checked={task.completed}
                            onClick={() => {
                              searchTodo(task.id);
                            }}
                          />
                        </label>
                        <span className="todo__title">
                          {task.title}
                        </span>
                        <button
                          type="button"
                          className="todo__remove"
                          onClick={() => deleteTodo(task.id)}
                        >
                          ×
                        </button>
                        <div className="modal overlay">
                          <div className="modal-background has-background-white-ter" />
                        </div>

                      </div>

                    );
                  }

                  return <div className="loader" />;
                })}
              </>
            )}

            {/* This todo is not completed
            <div className="todo">
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  onClick={() => setIsCompleted(false)}
                />
              </label>

              <span className="todo__title">Not Completed Todo</span>
              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div> */}
            {/*
            This todo is being edited
            <div className="todo">
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              {/* This form is shown instead of the title and remove button */}
            {/* <form>
                <input
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value="Todo is being edited now"
                />
              </form>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>

            {/* This todo is in loadind state */}
            {/* <div className="todo">
              <label className="todo__status-label">
                <input type="checkbox" className="todo__status" />
              </label>

              <span className="todo__title">Todo is being saved now</span>
              <button type="button" className="todo__remove">×</button>

              {/* 'is-active' class puts this modal on top of the todo */}
            {/* <div className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div> */}
          </section>

          {/* Hide the footer if there are no todos */}
          {todo.length > 0 && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${numberOfActiveTodos} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter">
                <a
                  href="#/"
                  className={selectedTab === 'All'
                    ? 'filter__link selected'
                    : 'filter__link'}
                  onClick={() => setSelectedTab('All')}
                  role="button"
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={selectedTab === 'Active'
                    ? 'filter__link selected'
                    : 'filter__link'}
                  onClick={() => setSelectedTab('Active')}
                  role="button"
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={selectedTab === 'Completed'
                    ? 'filter__link selected'
                    : 'filter__link'}
                  onClick={() => setSelectedTab('Completed')}
                  role="button"
                >
                  Completed
                </a>
              </nav>

              {isThereCompletedTodos && (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  onClick={resetEverything}
                >
                  Clear completed
                </button>
              )}
            </footer>
          )}

        </div>

        {errorMessageField && (
          <div className="notification is-danger is-light has-text-weight-normal">
            <button
              type="button"
              className="delete"
              onClick={() => {
                setIsDeleteingTodoAllowed(false);
                setIsAddingTodoAllowed(false);
                setIsEditingTodoAllowed(false);
                setErrorMessageField(false);
              }}
            />

            {isAddingTodoAllowed && (
              'Unable to add a todo'
            )}

            <br />
            {isDeleteingTodoAllowed && (
              'Unable to delete a todo'
            )}
            <br />
            {isEditingTodoAllowed && (
              'Unable to update a todo'
            )}
          </div>
        )}
      </div>
    </>
  );
};
