import { useContext } from 'react';
import { Footer } from '../Footer/Footer';
import { TodosList } from '../TodosList/TodosList';
import { ErrorComponent } from '../errorComponent/ErrorComponent';
import { TodosContext } from '../../contexts/TodosContext';
import { filterTodosList } from '../../services/filterTodosList';
import { Header } from '../Header/Header';

export const TodoApp = () => {
  const { todos, filterBy } = useContext(TodosContext);
  const preparedTodosList = filterTodosList(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todos.length
          && <TodosList todos={preparedTodosList} />}

        {!!todos.length
          && <Footer />}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorComponent />
    </div>
  );
};
