import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders title: Air Quality', () => {
  render(<App />);
  const Title = screen.getByText(/Air Quality/i);
  expect(Title).toBeInTheDocument();
});

// prints api location list to text in the app
// shows number of relevant measurements per location
// shows number of measurements above threshold per location
// shows an indicator that location meets air quality standard (star and green text)