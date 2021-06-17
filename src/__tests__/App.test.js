import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders title: Air Quality', () => {
  render(<App />);
  const Title = screen.getByText(/Air Quality/i);
  expect(Title).toBeInTheDocument();
});
