import { setupServer } from 'msw/node'
import { handlers } from './handlers'

console.log("Mock server setup")

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers)