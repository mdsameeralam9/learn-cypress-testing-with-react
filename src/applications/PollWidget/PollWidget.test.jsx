// src/PollWidget.test.tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PollWidget from './index';

describe('PollWidget', () => {
  it('renders 3 poll options and initial disabled state', () => {
    render(<PollWidget />);

    // Options present via labels
    expect(screen.getByText('Roadside 1')).toBeInTheDocument();
    expect(screen.getByText('Roadside 2')).toBeInTheDocument();
    expect(screen.getByText('Roadside 3')).toBeInTheDocument();

    // Radios exist and are unchecked initially
    const radios = screen.getAllByRole('radio', { name: /Roadside/ });
    expect(radios).toHaveLength(3);
    radios.forEach(r => expect(r).not.toBeChecked());

    // Ranges exist and are disabled initially
    const ranges = screen.getAllByRole('slider');
    expect(ranges).toHaveLength(3);
    ranges.forEach(r => expect(r).toBeDisabled());

    // No vote/percent text shown while disabled
    expect(screen.queryByText(/votes/)).not.toBeInTheDocument();
  });

  it('selects an option (radio checked), increments vote, shows votes and enables range', async () => {
    const user = userEvent.setup();
    render(<PollWidget />);

    // Click "Roadside 2" -> initial data 1:20, 2:10, 3:30 => 2 becomes 11
    const option2 = screen.getByText('Roadside 2');
    await user.click(option2);

    // Radio checked for option 2 only
    const radio2 = within(option2.closest('label')).getByRole('radio', { name: 'Roadside 2' });
    expect(radio2).toBeChecked();
    const otherRadios = screen.getAllByRole('radio', { name: /Roadside/ }).filter(r => r == radio2);
    otherRadios.forEach(r => expect(r).not.toBeChecked());

    // Votes text visible after first click (widget enabled)
    // Total after click: 20 + 11 + 30 = 61; percent for 11 -> 18.0%
    expect(screen.getByText(/11 votes \(18.0\)/)).toBeInTheDocument();

    // The selected option's range is enabled now (all become enabled per component)
    const ranges = screen.getAllByRole('slider');
    ranges.forEach(r => expect(r).not.toBeDisabled());

    // Range value for option 2 equals its votes
    // Find the "Roadside 2" container and assert its input[value=11]
    const item2 = option2.closest('.item');
    const slider2 = within(item2).getByRole('slider');
    expect(slider2.value).toBe('11');

    // Max equals totalWidget (61)
    expect(slider2.max).toBe('61');
  });

  it('changes selection updates counts and percentages accordingly', async () => {
    const user = userEvent.setup();
    render(<PollWidget />);

    // First click Roadside 1 -> 21; total 61; 21/61 -> 34.4%
    await user.click(screen.getByText('Roadside 1'));
    expect(screen.getByText(/21 votes \(34.4\)/)).toBeInTheDocument();

    // Next click Roadside 3 -> 31; total now 62; 31/62 -> 50.0%
    await user.click(screen.getByText('Roadside 3'));
    expect(screen.getByText(/31 votes \(50.0\)/)).toBeInTheDocument();

    // Only Roadside 3 radio checked
    const radios = screen.getAllByRole('radio', { name: /Roadside/ });
    const r1 = within(screen.getByText('Roadside 1').closest('label')).getByRole('radio', { name: 'Roadside 1' });
    const r2 = within(screen.getByText('Roadside 2').closest('label')).getByRole('radio', { name: 'Roadside 2' });
    const r3 = within(screen.getByText('Roadside 3').closest('label')).getByRole('radio', { name: 'Roadside 3' });
    expect(r1).not.toBeChecked();
    expect(r2).not.toBeChecked();
    expect(r3).toBeChecked();
  });

  it('reset brings back initial state, hides votes and disables sliders', async () => {
    const user = userEvent.setup();
    render(<PollWidget />);

    // Enable first by clicking something
    await user.click(screen.getByText('Roadside 1'));
    expect(screen.getByText(/votes/)).toBeInTheDocument();

    // Reset
    await user.click(screen.getByRole('button', { name: /Remove Poll/ }));
    // Radios unchecked again
    screen.getAllByRole('radio', { name: /Roadside/ }).forEach(r => expect(r).not.toBeChecked());
    // Sliders disabled again
    screen.getAllByRole('slider').forEach(r => expect(r).toBeDisabled());
    // Vote text hidden again
    expect(screen.queryByText(/votes/)).not.toBeInTheDocument();
  });
});
