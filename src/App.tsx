// import { UserWarning } from './UserWarning';
import React, { useEffect, useMemo, useState } from 'react';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { FilterValues } from './types/FilterValues';
import { TodoList } from './Components/TodoList';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { ErrorNotification } from './Components/ErrorNotification';

// if (!USER_ID) {
//   return <UserWarning />;
// }
function applyFIlter(filter: FilterValues, todos: Todo[]) {
  return todos.filter(todo => {
    switch (filter) {
      case FilterValues.Active:
        return !todo.completed;
      case FilterValues.Completed:
        return todo.completed;
      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(FilterValues.All);
  const filteredTodos = useMemo(
    () => applyFIlter(filter, todos),
    [filter, todos],
  );

  const applyErrorForSomeTime = (errorText: string, delayToRemove = 3000) => {
    setErrorMessage(errorText);

    setTimeout(() => setErrorMessage(''), delayToRemove);
  };

  useEffect(() => {
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => applyErrorForSomeTime('Unable to load todos'));
  }, []);

  const addTodo = async ({ title, userId, completed }: Omit<Todo, 'id'>) => {
    try {
      if (title.trim().length === 0) {
        throw new Error();
      }

      const newTodo = await todoService.postTodo({ title, userId, completed });

      setTodos(currentTodos => [...currentTodos, newTodo]);
    } catch (error) {
      if (title.trim().length === 0) {
        applyErrorForSomeTime('Title should not be empty');
      } else {
        applyErrorForSomeTime('Unable to add a todo');
      }

      throw error;
    }
  };

  const updateTodo = (todoToUpdate: Todo) => {
    return todoService
      .updateTodo(todoToUpdate)
      .then(() =>
        setTodos(currentTodos => {
          return currentTodos.map(todo =>
            todo.id === todoToUpdate.id ? todoToUpdate : todo,
          );
        }),
      )
      .catch(error => {
        applyErrorForSomeTime('Unable to update a todo');
        throw error;
      });
  };

  const deleteTodo = (todoId: number) => {
    return todoService
      .deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(error => {
        applyErrorForSomeTime('Unable to delete a todo');
        throw error;
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          onAddTodo={addTodo}
          onUpdateTodosCompleted={updateTodo}
        />

        <TodoList
          todos={filteredTodos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            currentFilter={filter}
            onChangeFilter={setFilter}
            onDelete={deleteTodo}
          />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
