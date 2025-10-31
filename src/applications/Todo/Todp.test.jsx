import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

describe("todo test", () => {
  // initial data;
  it("initial Data at UI", () => {
    render(<Todo />);
    const h1Text = screen.getByText("Todo App");
    const nodataText = screen.getByText("No todos yet. Add one above!");
    const btn = screen.getByRole("button", { name: "Add" });
    const inpt = screen.getByPlaceholderText(/Add a new todo.../);

    expect(h1Text).toBeInTheDocument();
    expect(nodataText).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(inpt).toBeInTheDocument();
  });

  // add a todo by Btn click
  it("add a todo", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const int = screen.getByPlaceholderText(/Add a new todo.../);
    const btn = screen.getByRole("button", { name: "Add" });

    await user.type(int, "Buy milk");
    await user.click(btn);

    const todoText = screen.getByText("Buy milk");
    expect(todoText).toBeInTheDocument();

    const nodataText = screen.queryByText("No todos yet. Add one above!");
    expect(nodataText).not.toBeInTheDocument();
  });

  // add todo By Enter
  it("add tod by enter", async () => {
    const userevent = userEvent.setup();
    render(<Todo />);
    const inpt = screen.getByPlaceholderText(/Add a new todo.../);
    //await userevent.type(inpt, "Buy Curd{enter}");
    await userevent.type(inpt, "Buy Curd");
    await userevent.keyboard("{Enter}");
    const todoText = screen.getByText("Buy Curd");
    expect(todoText).toBeInTheDocument();
  });

  // delete todo
  it("delete item", async () => {
    const userEvnt = userEvent.setup();
    render(<Todo />);
    const inpt = screen.getByPlaceholderText("Add a new todo...");
    await userEvnt.type(inpt, "milk");
    await userEvnt.keyboard("{Enter}");

    const itemToDelete = screen.getByText("milk");
    expect(itemToDelete).toBeInTheDocument();

    const deletBtn = screen.getByRole("button", { name: "Delete" });
    await userEvnt.click(deletBtn);
  });

  // edit todo
  test("edit pre-fills input and saves on Add", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByRole("textbox", { name: "textTodo" });
    await user.type(input, "Old text");
    await user.click(screen.getByRole("button", { name: /Add/i }));

    await user.click(screen.getByRole("button", { name: /Edit/i }));
    // Input should be pre-filled with existing text
    expect(screen.getByDisplayValue("Old text")).toBeInTheDocument();

    // Your addTodo updates text when editId is set
    await user.clear(input);
    await user.type(input, "New text");
    await user.click(screen.getByRole("button", { name: /Add/i }));

    expect(screen.getByText("New text")).toBeInTheDocument();
    expect(screen.queryByText("Old text")).not.toBeInTheDocument();
  });


  // testinh ul
  test("testing ul and li", async() => {
    const userEvnt = userEvent.setup();
    render(<Todo />);

    const ul = screen.getByTestId('ulLits')
    expect(ul).toBeInTheDocument()
    expect(screen.queryAllByRole('listimmmjntem')).toHaveLength(0);

    const inpt = screen.getByPlaceholderText('Add a new todo...');
    await userEvnt.type(inpt, 'buy product');
    await userEvnt.keyboard('{Enter}');

    expect(screen.getAllByRole("listitem")).toHaveLength(1)

  })

  // snapshot testing
  it("snapshot testing", () => {
    const { container } = render(<Todo />);
    expect(container).toMatchSnapshot();
  });



});
