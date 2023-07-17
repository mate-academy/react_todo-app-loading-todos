import React, { useEffect, useState } from 'react';
import { Authorization } from './components/authorization';
import { Etodos, LogingSteps, ResponseError } from './types/enum';
import { UserData } from './types/userData';
import { Todo } from './types/Todo';
import { deleteTodoOnServer, getTodos, updateTodoProp } from './api';
import { TodoItem } from './components/Todo';
import { TodoHeader } from './components/TodoHeader';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

const defaultUser = {
  createdAt: '2023-07-10T13:09:53.578Z',
  email: 'gookidoo@gmail.com',
  id: 11038,
  name: 'Віктор Булденко',
  phone: null,
  updatedAt: '2023-07-10T13:09:53.578Z',
  username: null,
  website: null,
};

export const App: React.FC = () => {
  const [step, setStep] = useState(LogingSteps.EMAIL);
  const [user, setUser] = useState<UserData>(defaultUser);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isUncomplete, setIsUncomplete] = useState<number>(0);
  const [isShowFooter, setIsShowFooter] = useState<boolean>(true);
  const [sortTodosBy, setSortTodosBy] = useState<Etodos>(Etodos.ALL);
  const [respError, setRespError] = useState<ResponseError>(ResponseError.NOT);
  const [isToggleActiveTodos, setIsToggleActiveTodos] = useState(true);

  const toggleTodosActive = () => {
    const promiseList = todos.map((todo) => {
      if (todo.completed !== isToggleActiveTodos) {
        return updateTodoProp(todo.id, {
          completed: isToggleActiveTodos,
        });
      }

      return [];
    });

    setIsToggleActiveTodos(!isToggleActiveTodos);

    Promise.all(promiseList).then(() => {
      getTodos(user.id).then((todoList) => {
        setTodos(todoList);
        setIsShowFooter(Boolean(todoList.length));
      });
    });
  };

  const checkCompletedTodo = (arr: Todo[]) => {
    let counter = 0;

    for (let i = 0; i < arr.length; i += 1) {
      if (!arr[i].completed) {
        counter += 1;
      }
    }

    setIsUncomplete(counter);
  };

  const deleteTodo = (id: number) => {
    deleteTodoOnServer(id)
      .then(() => {
        getTodos(user.id).then((todoList) => {
          setTodos(todoList);
          checkCompletedTodo(todoList);
          setIsShowFooter(Boolean(todoList.length));
        });
      })
      .catch(() => setRespError(ResponseError.ADD));
  };

  const updateTodo = (todoId: number, obj: Partial<Todo>) => {
    updateTodoProp(todoId, obj)
      .then(() => {
        getTodos(user.id).then((todoList) => {
          setTodos(todoList);
          checkCompletedTodo(todoList);
          setIsShowFooter(Boolean(todoList.length));
        });
      })
      .catch(() => setRespError(ResponseError.UPDATE));
  };

  const displayTodos = (sortBy: Etodos) => {
    switch (sortBy) {
      case Etodos.ACTIVE:
        return todos.filter((todo) => todo.completed === false);

      case Etodos.COMPLETED:
        return todos.filter((todo) => todo.completed === true);

      default:
        return [...todos];
    }
  };

  useEffect(() => {
    getTodos(user.id)
      .then((todosList) => {
        setIsUncomplete(
          todosList.reduce((acc: number, todo: Todo):number => {
            if (!todo.completed) {
              return acc + 1;
            }

            return acc;
          }, 0),
        );

        setTodos(todosList);
      });
  }, []);

  if (step !== LogingSteps.COMPLETE) {
    return <Authorization step={step} setStep={setStep} setUser={setUser} />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
          toggleTodosActive={toggleTodosActive}
          userID={user.id}
          setRespError={setRespError}
          setTodos={setTodos}
          checkCompletedTodo={checkCompletedTodo}
          setIsShowFooter={setIsShowFooter}
        />

        <section className="todoapp__main">
          {displayTodos(sortTodosBy).map((todoObj) => (
            <TodoItem
              todo={todoObj}
              deleteTodo={deleteTodo}
              key={todoObj.id}
              updateTodo={updateTodo}
            />
          ))}
        </section>

        {isShowFooter && (
          <Footer
            isUncomplete={isUncomplete}
            sortTodosBy={sortTodosBy}
            setSortTodosBy={setSortTodosBy}
            todos={todos}
            setTodos={setTodos}
            checkCompletedTodo={checkCompletedTodo}
            setIsShowFooter={setIsShowFooter}
            userID={user.id}
          />
        )}
      </div>

      {respError !== ResponseError.NOT && (
        <Notification respError={respError} setRespError={setRespError} />
      )}
    </div>
  );
};
