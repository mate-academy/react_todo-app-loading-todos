import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
// export const addTodo = (userId, todo) => {
//   return client.post<Todo[]>(`/todos?userId=${userId}`, todo);
// };

// export const createTodo = (title) => {
//   return fetch('/todos', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify({
//       userId: 1,
//       completed: false,
//       title,
//     }),
//   })
//     .then(response => response.json());
// };

// createTodo('qweqwe').then((value) => {console.log(value)});

// App ->

// const [newTodo, setNewTodo] = useState<Todo | null>(null);

// const handleSumbitForm = async (event: React.FormEvent) => {
//   event.preventDefault();

//   const newTodos: Todo = {
//     id: +new Date(),
//     title: todoTitle,
//     completed: false,
//     userId: user?.id,
//   };

//   const todosFromServer = await addTodo(newTodos.userId, newTodos);

//   // setTodos((currentTodos) => [...currentTodos, newTodos]);
// };

// <form
// action="/api/todos"
// method="POST"
// onSubmit={handleSumbitForm}
// >
