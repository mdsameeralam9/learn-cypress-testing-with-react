import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PollWidget from "./index";

describe("Test Poll component", () => {
  test("initial data on screen", () => {
    render(<PollWidget />);

    const h1 = screen.getByRole("heading", { name: "PollWidget" });
    expect(h1).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: "Remove Poll" });
    expect(btn).toBeInTheDocument();

    const inptradio = screen.getAllByRole('radio', {name: /Roadside/i})
    expect(inptradio.length).toBe(3);
    expect(inptradio).toHaveLength(3);
    inptradio.forEach(i => expect(i).not.toBeChecked())


    const inptrRange = screen.getAllByRole('slider', {name: /rangeInput/i})
    expect(inptrRange.length).toBe(3);
    expect(inptrRange).toHaveLength(3);
    inptrRange.forEach(i => expect(i).toBeDisabled())


  });

  it("action", async() => {
   const usrEvnt = userEvent.setup();
   render(<PollWidget />);

    const inptRad = screen.getAllByRole('radio', {name: /Roadside/i});
    const inptRad2 = screen.getAllByRole('slider', {name: /rangeInput/i});

    await usrEvnt.click(inptRad[0])

    expect(inptRad[0]).toBeChecked()
    expect(inptRad2[0]).not.toBeDisabled()
  })
});
