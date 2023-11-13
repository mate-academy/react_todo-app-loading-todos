/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
} from 'react';
import * as todosServise from './api/todos';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
// import { reducer } from './reduser';
import { TodosContext } from './TodosContext';
import { USER_ID } from './types/helpers';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

export const TodoApp: React.FC = () => {
  // const [state, dispatchState] = useReducer<any>(reducer, {
  //   todo: [],
  // });

  const {
    todos,
    setTodos,
    setErrorMessage,
    isVisible,
    setIsVisible,
  } = useContext(TodosContext);

  useEffect(() => {
    todosServise.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsVisible(true);
      });
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    return () => { };
  }, [isVisible]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodos = ({ title, completed, userId }: Todo) => {
    if (!title.trim()) {
      setIsVisible(true);
      setErrorMessage('Title should not be empty');

      return;
    }

    todosServise.createTodos({ title, completed, userId })
      .then(newTodo => setTodos((currentTodos: Todo[]) => {
        return [...currentTodos, newTodo];
      }))
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        setIsVisible(true);
      });
  };

  const deleteTodo = (todoId: number) => {
    todosServise.deleteTodos(todoId)
      .then(() => {
        setTodos((currentTodos: Todo[]) => (
          currentTodos.filter(todo => todo.id !== todoId)));
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setIsVisible(true);
      });
  };

  // const updateTodo = (updatedTodo: Todo) => {
  //   todosServise.updateTodo(updatedTodo)
  //     .then(todo => setTodos(currentTodos => {
  //       const newTodos = [...currentTodos];
  //       const index = newTodos.findIndex(t => t.id === updatedTodo.id);

  //       return newTodos.splice(index, 1, todo);
  //     }))
  //     .catch(() => {
  //       setErrorMessage('Unable to update a todo');
  //       setIsVisible(true);
  //     });
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onAdd={addTodos} setIsVisible={setIsVisible} />

        <TodoList
          onDelete={deleteTodo}
        />

        {todos.length > 0 && (
          <Footer />
        )}
      </div>

      <Error />
    </div>
  );
};
