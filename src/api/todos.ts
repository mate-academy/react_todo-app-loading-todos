import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2410;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (title: string) => {
  return client.post<Todo>(`/todos`, {
    title,
    userId: USER_ID,
    completed: false,
  });
};

export const deleteAll = (list: Todo[]) => {
  return list.map(task => {
    return client.delete(`/todos/${task.id}`);
  });
};

// Add more methods here

/* deletePost в примере

  Тоесть мы удаляем на сервере, и удаляем у себя в листе, а не делаем запрос
  за новыми данными.

const deletePost = (postId: number) => {
  return client.delete(postId)
    .then(() => {
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    })
}

*/

/* addPost в примере

function addPost({ title, userId, body }: Post) {
  postService.addPost({ title, userId, body })
    .then(newPost => {
      setPosts(currentPosts => [...currentPosts, newPost]);
    });
}

*/

/* editPost
  function updatePost(updatedPost: Post) {
  setPosts(currentPosts => { --- без отправки данных на сервер
    return currentPosts.map(
      post => post.id === updatedPost.id ? updatedPost : post,
    );
  });

  function updatePost(postToUpdate: Post) {
    postService.updatePost(postToUpdate)
      .then((updatedPost) => {
        setPosts(currentPosts => {
          return currentPosts.map(
            post => post.id === updatedPost.id ? updatedPost : post,
          );
        });
      });
    }
  }
  
  Обработка ошибок 
function addPost({ title, userId, body }: Post) {
  setErrorMessage('');

  return postService.addPost({ title, userId, body })
    .then(newPost => {
      setPosts(currentPosts => [...currentPosts, newPost]);
    })
    .catch((error) => {
      setErrorMessage('Failed to add post');
      throw error;
    });
}

  Обработка лоадера
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = () => {
  setIsSubmitting(true);

  onSubmit()
    .then(reset)
    .finally(() => setIsLoading(false));
}

  Обработка delete
my:
  const handleDelete = (list: Todo[]) => {
    deleteAll(list);
    setTodoList([]);
  };

correct one:
  const deletePost = (postId: number) => {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));

    return client.delete(postId)
      .catch((error) => {
        setPosts(posts); // posts - из стейта
        setErrorMessage(`unable to delete a post`);
        throw error;
      })
  }
*/
