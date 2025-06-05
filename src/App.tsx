const [todos, setTodos] = useState<Todo[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

useEffect(() => {
  loadTodos();
}, []);

const loadTodos = async () => {
  setErrorMessage('');
  setIsLoading(true);

  try {
    const data = await getTodos(USER_ID);
    setTodos(data);
  } catch (error) {
    setErrorMessage('Unable to load todos');
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (errorMessage) {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timeout);
  }
}, [errorMessage]);

const closeError = () => {
  setErrorMessage('');
};

<div className={`notification ${errorMessage ? '' : 'hidden'}`}>
  {errorMessage}
  <button onClick={closeError} className="delete" />
</div>

<ul className="filters">
  <li>
    <a
      href="#/"
      className={filter === 'all' ? 'selected' : ''}
      onClick={() => setFilter('all')}
    >
      All
    </a>
  </li>
  <li>
    <a
      href="#/active"
      className={filter === 'active' ? 'selected' : ''}
      onClick={() => setFilter('active')}
    >
      Active
    </a>
  </li>
  <li>
    <a
      href="#/completed"
      className={filter === 'completed' ? 'selected' : ''}
      onClick={() => setFilter('completed')}
    >
      Completed
    </a>
  </li>
</ul>

const visibleTodos = todos.filter(todo => {
  switch (filter) {
    case 'active':
      return !todo.completed;
    case 'completed':
      return todo.completed;
    default:
      return true;
  }
});

{visibleTodos.length > 0 && (
  <>
    <ul className="todo-list">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>

    <footer className="footer">
      {/* Filter links here */}
    </footer>
  </>
)}
