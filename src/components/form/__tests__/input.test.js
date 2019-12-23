import '@testing-library/jest-dom/extend-expect'
import { getByText, render } from '@testing-library/svelte'
import Input from '../input.svelte'

test('label to have value', async () => {
  const { container } = render(Input, {
    props: {
      label: 'Username',
      placeholder: 'Placeholder',
    },
  })
  expect(getByText(container, 'Username')).toHaveTextContent('Username')
})
