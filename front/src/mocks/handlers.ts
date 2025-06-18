import { http } from 'msw';

export const handlers = [
  http.get('/todos', ({ request }) => {
    console.log("Request received for /todos", request.url);
  }),
];