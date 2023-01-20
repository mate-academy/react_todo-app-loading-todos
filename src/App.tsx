import { TodoContent } from './components/Todo/TodoContent';
import { Error } from './components/Error/Error';

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent />

      <Error />
    </div>
  );
};
