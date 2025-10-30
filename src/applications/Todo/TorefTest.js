import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
  test('renders empty state', () => {
    render(<TodoApp />);
    expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
    expect(screen.getByText(/No todos yet\. Add one above!/i)).toBeInTheDocument();
  });

  test('adds a todo via button', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, 'Buy milk');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  test('adds a todo via Enter key', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, 'Read book{enter}');

    expect(screen.getByText('Read book')).toBeInTheDocument();
  });

  test('toggles completion', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, 'Item 1');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Item 1')).toHaveClass('line-through');
  });

  test('delete removes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, 'Item 2');
    await user.click(screen.getByRole('button', { name: /Add/i }));
    await user.click(screen.getByRole('button', { name: /Delete/i }));

    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  test('edit pre-fills input and saves on Add', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, 'Old text');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    await user.click(screen.getByRole('button', { name: /Edit/i }));
    // Input should be pre-filled with existing text
    expect(screen.getByDisplayValue('Old text')).toBeInTheDocument();

    // Your addTodo updates text when editId is set
    await user.clear(input);
    await user.type(input, 'New text');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    expect(screen.getByText('New text')).toBeInTheDocument();
    expect(screen.queryByText('Old text')).not.toBeInTheDocument();
  });

  test('ignores empty/whitespace-only input', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    expect(screen.getByText(/No todos yet\. Add one above!/i)).toBeInTheDocument();
  });
});
