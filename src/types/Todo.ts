export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const todosFromServer: Todo[] = [
  {
    id: 1, userId: 10884, title: 'testing', completed: false,
  },
  {
    id: 2, userId: 10884, title: 'test', completed: true,
  },
  {
    id: 3, userId: 10884, title: '457', completed: false,
  },
];
