import React, { useEffect, useState, useMemo } from 'react';
import {
  getTodos,
  postTodo,
  patchTodo,
  deleteTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { TodoItemLoader } from './components/TodoItemLoader';
import { Footer } from './components/Footer';
import { Error } from './components/Errors';
import { Filter } from './types/Filter';
import { ErrorsMessages } from './types/ErrorsMessages';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHeaderDisabled, setIsHeaderDisabled] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo>();
  const [isLoader, setIsLoader] = useState(false);
  const [loaderId, setLoaderId] = useState(-1);
  const [currentFilter, setCurrentFilter] = useState<Filter>('all');
  const userId = 6725;

  const removeMessage = () => {
    setErrorMessage('');
  };

  const createErrorMessage = (title: ErrorsMessages) => {
    setErrorMessage(title);
  };

  const showErrorMessage = (message: ErrorsMessages) => {
    createErrorMessage(message);
    setTimeout(() => (removeMessage()), 3000);
  };

  const loadTodos = async () => {
    setErrorMessage('');

    try {
      const dataFromServer = await getTodos();

      setTodos(dataFromServer);
    } catch (error) {
      showErrorMessage(ErrorsMessages.Load);
    }
  };

  const setFilter = (filter: Filter) => {
    setCurrentFilter(filter);
  };

  const filterTodos = (filteringProperty: Filter) => {
    return (
      filteringProperty === 'all'
        ? todos
        : todos.filter(todo => {
          switch (filteringProperty) {
            case 'active':
              return !todo.completed;
            case 'completed':
              return todo.completed;
            default:
              return null;
          }
        })
    );
  };

  const filteredTodos: Todo[] = useMemo(
    () => filterTodos(currentFilter),
    [todos, currentFilter],
  );

  const addTodo = async (newTodoTitle: string) => {
    setErrorMessage('');
    setIsHeaderDisabled(true);

    try {
      setTempTodo({
        id: 0,
        userId,
        title: newTodoTitle,
        completed: false,
      });
      const newTodoPost = await postTodo({
        title: newTodoTitle,
        userId: 6725,
        completed: false,
      });

      setTodos((items) => [...items, newTodoPost]);
    } catch (error) {
      showErrorMessage(ErrorsMessages.Post);
    }

    setTempTodo(undefined);
    setIsHeaderDisabled(false);
  };

  const filterTodosById = (todoElements: Todo[], id: number) => {
    return todoElements.filter((item) => item.id !== id);
  };

  const removeTodo = async (id: number) => {
    setErrorMessage('');
    setIsLoader(true);
    setLoaderId(id);

    try {
      const response = await deleteTodo(id);

      if (response) {
        setTodos(filterTodosById(todos, id));
      }
    } catch (error) {
      showErrorMessage(ErrorsMessages.Delete);
    }

    setIsLoader(false);
  };

  const removeCompletedTodos = async () => {
    setIsLoader(true);
    setLoaderId(-1);

    try {
      const completedTodos = (
        todos.filter(el => el.completed)
          .map(item => item.id)
      );
      const removed = await Promise.all([
        completedTodos.map(el => deleteTodo(el)),
      ]);

      if (removed) {
        setTodos((prev) => {
          return prev.filter((todo) => !todo.completed);
        });
      }
    } catch (error) {
      showErrorMessage(ErrorsMessages.Delete);
    }

    setIsLoader(false);
  };

  const handleChecker = async (id: number, data: unknown) => {
    setErrorMessage('');
    setIsLoader(true);
    setLoaderId(id);

    try {
      const response = await patchTodo(id, data);
      const todoEdited = todos.find((todo) => todo.id === id);
      const isTitleChanged = response.title !== todoEdited?.title;
      const isCompletedChanged = response.completed !== todoEdited?.completed;

      if (isTitleChanged || isCompletedChanged) {
        setTodos((oldTodos) => {
          const newTodos = oldTodos.map((el) => ({
            ...el,
            completed: el.id === id ? response.completed : el.completed,
            title: el.id === id ? response.title : el.title,
          }));

          return (
            newTodos
          );
        });
      }
    } catch (error) {
      showErrorMessage(ErrorsMessages.Update);
    }

    setIsLoader(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const isFooterVisible = !!todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          addTodo={addTodo}
          handleChecker={handleChecker}
          errorMessage={showErrorMessage}
          disabled={isHeaderDisabled}
        />
        <Main
          todos={filteredTodos}
          handleChecker={handleChecker}
          removeTodo={removeTodo}
          isLoader={isLoader}
          loaderId={loaderId}
          errorMessage={showErrorMessage}
        />
        {tempTodo && <TodoItemLoader todo={tempTodo} />}
        {isFooterVisible && (
          <Footer
            todos={todos}
            filter={setFilter}
            currentFilter={currentFilter}
            removeCompletedTodos={removeCompletedTodos}
          />
        )}
      </div>
      <Error
        errorMessage={errorMessage}
        removeMessage={removeMessage}
      />
    </div>
  );
};
