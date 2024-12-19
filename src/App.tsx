/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodo, getTodos, updateTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getCompletedTodos } from './utils/methods';
import { TodoList } from './components/TodoList';
import { FILTER_BY } from './constants/constants';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Error } from './components/Error';

function filterTodos(todos: Todo[], filterBy: string) {
  const copy = [...todos];

  switch (filterBy) {
    case FILTER_BY.ALL:
      return copy;
    case FILTER_BY.ACTIVE:
      return copy.filter(e => !e.completed);
    case FILTER_BY.COMPLETED:
      return copy.filter(e => e.completed);
  }

  return [];
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState(FILTER_BY.ALL);
  const filteredTodos = filterTodos(todos, filterBy);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const sizeItemsLeft = () => todos.length - getCompletedTodos(todos).length;

  const handleUpdateCompleted = (todo: Todo) => {
    const updatedTodo = {
      id: todo.id,
      completed: todo.completed,
    };

    updateTodo(updatedTodo)
      .then(response => {
        setTodos(prev => {
          return prev.map(e =>
            e.id === response.id ? { ...e, ...response } : e,
          );
        });
      })
      .catch(() => setErrorMessage('Unable to update todo'));
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id).catch(() => {
      setErrorMessage('Unable to delete todo');
    });
    setTodos(prev => {
      const copy = [...prev];
      const index = copy.findIndex(e => e.id === id);

      copy.splice(index, 1);

      return copy;
    });
  };

  const clearCompleted = () => {
    setTodos(prev => {
      return prev.map(elem => {
        const currentElem = elem;

        if (currentElem.completed) {
          updateTodo({ id: elem.id, completed: false });
          currentElem.completed = false;
        }

        return currentElem;
      });
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          sizeLeft={sizeItemsLeft()}
          onTodos={setTodos}
          onErrorMessage={setErrorMessage}
        />
        {/*List of Todos */}
        {filteredTodos.length > 0 && (
          <TodoList
            todos={filteredTodos}
            onUpdate={handleUpdateCompleted}
            onDelete={handleDeleteTodo}
          />
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filter={filterBy}
            sizeLeft={sizeItemsLeft()}
            onFilter={setFilterBy}
            onClear={clearCompleted}
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
