import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoServise from './api/todos';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { TodoList } from './component/TodoList/TodoList';
import { message } from './messege/messege';
import { Headers } from './component/Headers/Headers';
import { Footer } from './component/Footer/Footer';

function filteredTodos(todos: Todo[], completed?: boolean) {
  let newTodosList = [...todos];

  if (completed !== undefined) {
    newTodosList = newTodosList.filter(todo => todo.completed === completed);
  }

  return newTodosList;
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(message.complete);
  const [stateTodo, setStateTodo] = useState<boolean | undefined>();
  const [title, setTitle] = useState('');

  const todoCompleteList = filteredTodos(todoList, stateTodo);

  const completedAll = todoList.every(todo => todo.completed);
  const itemLeft = todoList.filter(todo => todo.completed === false).length;

  useEffect(() => {
    todoServise
      .getTodos()
      .then(setTodoList)
      .catch(error => {
        setErrorMessage(message.errorLoad);
        throw error;
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage(message.complete);
        }, 3000);
      });
  }, []);

  if (!todoServise.USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim().length === 0) {
      setErrorMessage(message.errorTitle);

      return;
    }

    todoServise
      .addTodos(title)
      .then(todo => {
        setTodoList(currentList => [...currentList, todo]);
      })
      .catch(eroor => {
        throw eroor;
      });

    setTitle('');
    setErrorMessage(message.complete);
  };

  const deleteTodo = (todoId: number) => {
    setTodoList(currentTodoList =>
      currentTodoList.filter(todo => todo.id !== todoId),
    );

    return todoServise.deleteTodos(todoId).catch(error => {
      setTodoList(todoList);
      setErrorMessage(message.errorDelete);
      throw error;
    });
  };

  const handleCompletedAll = () => {
    setTodoList(currentTodo =>
      currentTodo.map(todo => ({
        ...todo,
        completed: !completedAll,
      })),
    );

    todoList.map(todo =>
      todoServise.patchTodos(todo.id, { completed: !completedAll }),
    );
  };

  const handleCompleted = (todoId: number) => {
    setTodoList(currentTodo =>
      currentTodo.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );

    const todoUpdete = todoList.find(todo => todo.id === todoId);

    if (todoUpdete) {
      return todoServise.patchTodos(todoId, {
        completed: !todoUpdete.completed,
      });
    }
  };

  const clearComplete = () => {
    const completedTodos = todoList.filter(todo => todo.completed);

    setTodoList(currentList => currentList.filter(todo => !todo.completed));

    return completedTodos.forEach(todo => {
      todoServise.deleteTodos(todo.id).catch(() => {
        setTodoList(todoList);
        setErrorMessage(message.errorDelete);
      });
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Headers
          todoCompleteList={todoCompleteList}
          handleCompletedAll={handleCompletedAll}
          completedAll={completedAll}
          handleSubmit={handleSubmit}
          title={title}
          setTitle={value => setTitle(value)}
        />

        {todoList.length > 0 && (
          <>
            <TodoList
              deleteTodos={deleteTodo}
              todoList={todoCompleteList}
              completed={handleCompleted}
            />

            <Footer
              itemLeft={itemLeft}
              stateTodo={stateTodo}
              setStateTodo={state => setStateTodo(state)}
              clearComplete={clearComplete}
            />
          </>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
