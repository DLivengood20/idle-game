import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cookie from '../Cookie';

describe('Cookie component', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<Cookie cookies={0} onClick={() => {}} />);
    expect(getByTestId('cookie-component')).toBeInTheDocument();
  });

  describe('Cookie display', () => {
    it('displays the cookie count', () => {
      const { getByTestId } = render(
        <Cookie cookies={10} onClick={() => {}} />
      );
      expect(getByTestId('cookie-count')).toHaveTextContent('10');
    });

    it('formats > 1000 cookie counts with k notation and 3 decimal places', () => {
      const { getByTestId } = render(
        <Cookie cookies={9999} onClick={() => {}} />
      );
      expect(getByTestId('cookie-count')).toHaveTextContent('9.999k');
    });

    it('formats > 10000 cookie counts with k notation and 2 decimal places', () => {
      const { getByTestId } = render(
        <Cookie cookies={99999} onClick={() => {}} />
      );
      expect(getByTestId('cookie-count')).toHaveTextContent('99.99k');
    });

    it('formats > 100000 cookie counts with k notation and 1 decimal place', () => {
      const { getByTestId } = render(
        <Cookie cookies={999999} onClick={() => {}} />
      );
      expect(getByTestId('cookie-count')).toHaveTextContent('999.9k');
    });
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(
      <Cookie cookies={0} onClick={onClickMock} />
    );
    const cookieButton = getByTestId('cookie-button');
    fireEvent.click(cookieButton);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
