import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as postService from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoAppFooter } from './components/TodoAppFooter/TodoAppFooter';
import { selectedFilter } from './types/selectedFilter';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState<number[]>([]);

  const [toggleComplete, setToggleComplete] = useState(false);
  const [filters, setFilters] = useState(selectedFilter.All);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await postService.getTodos();

        setTodos(todos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
      }
    };

    fetchTodos();
  }, []);

  let filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filters) {
        case selectedFilter.All:
          return true;
        case selectedFilter.Active:
          return !todo.completed;
        case selectedFilter.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [filters, todos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const applyFilter = (chosenFilter: selectedFilter) => {
    setFilters(chosenFilter);
  };

  const toggleAllTodosStatus = async () => {
    const todosId =
      todos
        .filter(todo => !toggleComplete !== todo.completed)
        .map(todo => todo.id) || todos.map(todo => todo.id);

    const newToggle = todos.find(todo => todo.completed === toggleComplete)
      ? !toggleComplete
      : toggleComplete;

    setToggleComplete(newToggle);
    setLoading(todosId);

    const updatedPromises = todos.map(t =>
      postService.patchTodo({ ...t, completed: newToggle }),
    );

    try {
      await Promise.all(updatedPromises);

      setTodos(currentTodos =>
        currentTodos.map(t =>
          newToggle !== t.completed ? { ...t, completed: newToggle } : t,
        ),
      );

      filteredTodos.map(t =>
        newToggle !== t.completed ? { ...t, completed: newToggle } : t,
      );
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      setTodos(todos);
      throw error;
    } finally {
      setLoading([]);
    }
  };

  const editTodo = async (updatedTodo: Todo) => {
    setLoading([updatedTodo.id]);
    setErrorMessage('');

    try {
      await postService.patchTodo(updatedTodo);

      setTodos(currentTodos => {
        const newTodos = currentTodos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        );

        return newTodos;
      });

      filteredTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      );
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      throw error;
    } finally {
      setLoading([]);
    }
  };

  const addTodo = async (
    e: React.FormEvent<HTMLFormElement>,
    todoName: string,
  ) => {
    e.preventDefault();
    setErrorMessage('');

    if (!todoName.trim()) {
      setErrorMessage('Title should not be empty');

      return Promise.resolve();
    }

    const tempTodo = {
      id: -Date.now(),
      title: todoName,
      userId: postService.USER_ID,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, tempTodo]);
    filteredTodos = [...filteredTodos, tempTodo];
    setLoading([tempTodo.id]);

    try {
      const newTodo = await postService.addTodo({
        title: todoName,
        userId: postService.USER_ID,
        completed: false,
      });

      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === tempTodo.id ? newTodo : todo)),
      );

      filteredTodos.map(todo => (todo.id === tempTodo.id ? newTodo : todo));
    } catch (error) {
      setTodos(todos);
      setErrorMessage('Unable to add a todo');
      throw error;
    } finally {
      setLoading([]);
    }
  };

  const deleteTodo = async (todoId: number) => {
    setLoading([todoId]);
    setErrorMessage('');

    try {
      await postService.deleteTodo(todoId);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
      filteredTodos.filter(todo => todo.id !== todoId);
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw error;
    } finally {
      setLoading([]);
    }
  };

  const deleteCompletedTodos = async () => {
    const doneTodos = todos.filter(todo => todo.completed);
    const doneId = doneTodos.map(todo => todo.id);

    setLoading(doneId);

    try {
      await Promise.all(doneTodos.map(todo => postService.deleteTodo(todo.id)));
      setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
      filteredTodos.filter(todo => !todo.completed);
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw error;
    } finally {
      setLoading([]);
    }
  };

  if (!postService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm
          onSubmit={addTodo}
          toggleAllTodosStatus={toggleAllTodosStatus}
          todos={todos}
        />

        <TodoList
          filteredTodos={filteredTodos}
          loading={loading}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />

        {todos.length !== 0 && (
          <TodoAppFooter
            todos={todos}
            applyFilter={applyFilter}
            deleteCompletedTodos={deleteCompletedTodos}
          />
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
