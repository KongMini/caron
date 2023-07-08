import 'react-native';

import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';

import {FormLogin} from '../items';

describe('Testing Form Login', () => {
  test('Render as expert', () => {
    const {toJSON} = render(<FormLogin />);

    expect(toJSON()).toMatchSnapshot();
  });
  test('PhoneIput has no value and Submit button disable by default', async () => {
    const {
      queryByPlaceholderText,
      queryByText,
      getAllByText,
      getByTestId,
      findByText,
    } = render(<FormLogin />);
    const submitButton = queryByText('Login');
    fireEvent(submitButton, 'press');
    expect(submitButton.children[0].children[0]).toEqual('Login');
    expect(submitButton).toBeDisabled();

    const phoneInput = queryByPlaceholderText('Phone Number');

    expect(phoneInput.props.value).toEqual('');
  });
});
