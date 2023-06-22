# React Todo App Load Todos

It is the first part of the React Todo App with API. You will implement the
final app step by step and use the result of this task in the next tasks.

You are given the markup of the Todo App. Split it into components and
implement the functionality saving all the changes to [the API](https://mate-academy.github.io/fe-students-api/).

> Here is [the working example](https://mate-academy.github.io/react_todo-app-with-api/)
# ❗️❗️❗️<br>Please implement ONLY todos loading, errors and filtering. <br><br>All the rest will be implemented in the next tasks<br>❗️❗️❗️

## General info

- register a user by your email [here](https://mate-academy.github.io/react_student-registration/)

--- https://mate.academy/students-api/todos?userId=10592

- save the received `userId` in the `App` and use to load load todos
- log in to the [Demo Page](https://mate-academy.github.io/react_todo-app-with-api/) with your email
- create some todos to see them later in your App
- load your todos when the `App` is loaded (put your userId instead of `???`);
    ```
    https://mate.academy/students-api/todos?userId=???
    ```
- hide the list and the footer if there are no todos yet;

> The API client is already implemented in the `src/utils/fetchClient.ts`. Learn it to understand how to interact with the API. If you want to implement it yourself you can delete the `fetchClient`.

## Error messages

In case of any error show the notification with an appropriate message at the bottom

- the notification can be closed with the `close` button (add the `hidden` class);
- automatically hide the notification after 3 seconds;
- also hide the notification before any next request;
- use a wrong todos URL to test the error;
- there are no tests yet.

## Filtering todos

Filter todos by status `All` / `Active` / `Completed`:

- `all` is the default value;
- use the `selected` class to highlight a selected link;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://fenderukr.github.io/react_todo-app-loading-todos/) and add it to the PR description.



## Adding a todo

Add a todo with the entered title on the form submit:

- if the title is empty show the `Title can't be empty` notification at the bottom;
- use your `userId` for the new todo;
- send a POST request to the API (check the [API Documentation](https://mate-academy.github.io/fe-students-api/))
- disable the input until receiving a response from the API;
- immediately after sending a request create a todo with `id: 0` and save it to the `tempTodo` variable in the state (NOT to the `todos` array);
- show an independent `TodoItem` **after** the list if `tempTodo` is not `null`;
- temp TodoItem should have the loader (check the original markup);
- in case of success add the todo created by the API to the array (take it from the POST response);
- in case of an API error show `Unable to add a todo` notification at the bottom;
- set `tempTodo` to `null` to hide the extra `TodoItem`;

> Don't try to implement animations for adding or removing Todos (at least until you finish everything else).
> If you really fill confident to try, there is a hint at the end of the description.

## Deleting todos

Remove a todo on `TodoDeleteButton` click:

- covered the todo with the loader while wating for the API response;
- remove the todo from the list on success;
- in case of API error show `Unable to delete a todo` notification at the bottom (the todo must stay in the list);

Remove all the completed todos after the `Clear completed` button click:

- the button should be visible only if there is at least 1 completed todo;
- the deletion should work as a several individual deletions running at the same time;