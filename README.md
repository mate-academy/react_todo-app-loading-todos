# React Todo App Load Todos

It is the first part of the React Todo App with API. You will implement the
final app step by step and use the result of this task in the next tasks.

You are given the markup of the Todo App. Split it into components and
implement the functionality saving all the changes to [the API](https://mate-academy.github.io/fe-students-api/).

> Here is [the working example](https://mate-academy.github.io/react_todo-app-with-api/)
## ❗️❗️❗️ Please implement ONLY todos loading, errors, and filtering. All the rest will be implemented in the next tasks ❗️❗️❗️

## ❗️ If you can't pass some tests ❗️
- You can find the test by its name in the `cypress/integration/page.spec.js` and skip a test (replace `it` with `it.skip`);
- Or skip a group of tests (replace `describe` with `describe.skip`)

## General info

- register a user by your email [here](https://mate-academy.github.io/react_student-registration/)
- save the received `userId` in the `App` and use it to load todos
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

## Filtering todos

Filter todos by status `All` / `Active` / `Completed`:

- `all` is the default value;
- use the `selected` class to highlight a selected link;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://daryna-hnidash.github.io/react_todo-app-loading-todos/) and add it to the PR description.


https://mate.academy/students-api/todos?userId=11443


Add a todo with the entered title on the form submit:

text field should be focused by default;

if the title is empty show the Title should not be empty notification at the bottom;

trim the title when checked or saved;

use your userId for the new todo;

send a POST request to the API (check the API Documentation)

disable the input until receiving a response from the API;

immediately after sending a request create a todo with id: 0 and save it to the tempTodo variable in the state (NOT to the todos array);

show an independent TodoItem after the list if tempTodo is not null;

temp TodoItem should have the loader (check the original markup);

in case of success add the todo created by the API to the array (take it from the POST response);

in case of an API error showing Unable to add a todo notification at the bottom;

set tempTodo to null to hide the extra TodoItem;

focus the text field after receiving a response;

clear the text in case of success;

keep the text in case of error;