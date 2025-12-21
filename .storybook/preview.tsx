import type { Preview } from '@storybook/nextjs-vite'
import type { Decorator } from '@storybook/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview

export const decorators: Decorator[] = [
  Story => (
    <>
      <Story />
      <ToastContainer
        position={'bottom-left'}
        autoClose={4000}
        closeOnClick
        draggable
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  ),
]
