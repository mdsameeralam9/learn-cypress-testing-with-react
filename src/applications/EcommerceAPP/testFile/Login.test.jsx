import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import Login from "../Login";
import ProductList from "../ProductList";

export function renderWithRoutes(
  ui,
  { initialRoute = "/login", routes = [] } = {}
) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </MemoryRouter>
  );
}

function mockFetchSequence(responses) {
  let call = 0;
  return vi.spyOn(global, "fetch").mockImplementation(async (url, opts) => {
    const next = responses[call++] || responses[responses.length - 1];
    return {
      ok: next.ok,
      status: next.status ?? (next.ok ? 200 : 400),
      json: async () => next.body,
    };
  });
}

describe("login component - unit testing", () => {
  const email = "emily.johnson@x.dummyjson.com";
  const pass = "emilyspass";

//   test("initia UI data", async () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );
//     const logo = screen.getByText("Login");
//     expect(logo).toBeInTheDocument();
//     expect(screen.getByText("Email")).toBeInTheDocument();
//     expect(screen.getByText("Password")).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
//     expect(
//       screen.queryByRole("button", { name: "Signing in..." })
//     ).not.toBeInTheDocument();
//   });

//   it("error data", async () => {
//     const usrEvnt = userEvent.setup();
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );
//     await usrEvnt.click(screen.getByText("Sign in"));

//     expect(
//       screen.getByText("Password must be at least 6 characters.")
//     ).toBeInTheDocument();
//   });

//   test("fill Data and navigate to product screen", async () => {
//     const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
//       ok: true,
//       json: async () => ({ accessToken: "token123" }),
//     });
//     const usrEvnt = userEvent.setup();
//     render(
//       <MemoryRouter initialEntries={["/login"]}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/products" element={<ProductList />} />
//         </Routes>
//       </MemoryRouter>
//     );
//     const eml = screen.getByPlaceholderText(/Enter email/i);
//     const ps = screen.getByPlaceholderText(/Enter password/i);

//     expect(eml).toBeInTheDocument();
//     expect(ps).toBeInTheDocument();

//     await usrEvnt.type(eml, email);
//     await usrEvnt.type(ps, pass);

//     const btn = screen.getByText("Sign in");

//     await usrEvnt.click(btn);

//     // After successful login, Products stub should be visible
//     expect(await screen.findByText(/Product List/i)).toBeInTheDocument();

//     // Ensure loading state toggled and fetch called with endpoint
//     expect(fetchSpy).toHaveBeenCalledWith(
//       "https://dummyjson.com/auth/login",
//       expect.objectContaining({ method: "POST" })
//     );

//     fetchSpy.mockRestore();
//   });

  test("logs in and shows products integration testing", async () => {
    const fetchSpy = mockFetchSequence([
      { ok: true, body: { accessToken: "token123" } },
      {
        ok: true,
        body: {
          products: [{ id: 1, title: "Phone", price: 199, thumbnail: "" }],
        },
      },
    ]);

    renderWithRoutes(<Login />, {
      routes: [
        { path: "/login", element: <Login /> },
        { path: "/products", element: <ProductList /> },
      ],
      initialRoute: "/login",
    });

    await userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "emily.johnson@x.dummyjson.com"
    );

    await userEvent.clear(screen.getByPlaceholderText(/Enter password/i));
    await userEvent.type(screen.getByPlaceholderText(/Enter password/i), "emilyspass");

    const submit = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(submit);

    await screen.findByText(/product list/i);
    expect(await screen.findByText(/phone/i)).toBeInTheDocument();

    expect(fetchSpy).toHaveBeenNthCalledWith(
      1,
      "https://dummyjson.com/auth/login",
      expect.objectContaining({ method: "POST" })
    );
    expect(fetchSpy).toHaveBeenNthCalledWith(
      2,
      "https://dummyjson.com/products",
      expect.any(Object)
    );

    fetchSpy.mockRestore();
  });
});
