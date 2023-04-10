import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList/TodoList';
import { filterTodos } from './utils/helpers/filterTodos';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { ErrorMessage } from './Components/ErrorMessage/ErrorMessage';

const USER_ID = 7004;

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState('All');
  const [errorMessage, setErrorMessage] = useState('');
  const [titleTodo, setTitleTodo] = useState('');

  const visibleTodos = filterTodos(todoList, filteredBy);

  const handleChangeFilterBy = (value: string) => {
    setFilteredBy(value);
  };

  const handleChangeTitleTodo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { target: { value } } = event;

    setTitleTodo(value);
  };

  const fetchTodos = async () => {
    try {
      const todos = await getTodos(USER_ID);

      setTodoList(todos);
    } catch {
      setErrorMessage('Todos not found!');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          titleTodo={titleTodo}
          handleChangeTitle={handleChangeTitleTodo}
        />

        <TodoList todos={visibleTodos} />

        {todoList.length > 0 && (
          <Footer
            filteredBy={filteredBy}
            todosLengh={visibleTodos.length}
            handleChange={handleChangeFilterBy}
            todos={visibleTodos}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
