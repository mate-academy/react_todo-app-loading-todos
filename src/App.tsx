import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
// import { Errors } from './components/Errors';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

export function filteredTodo(
  todos: Todo[],
  filterType: string,
  query: string,
) {
  const filterBy = todos.filter((todo) => {
    switch (filterType) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return todo;
    }
  });

  return filterBy.filter(({ title }) => (
    title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ));
}

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    const todosFromServer = async () => {
      if (user) {
        const getedTodos = getTodos(user.id);

        setTodos(await getedTodos);
      }
    };

    todosFromServer();

    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodosField={newTodoField} />
        <TodoList todos={todos} />

        {newTodoField === null
        && (
          <Footer
            todos={todos}
            filterTypes={setFilteredBy}
            filterType={filteredBy}
          />
        )}
      </div>

      {/* {newTodoField === null
      && <Errors />} */}

    </div>
  );
};
