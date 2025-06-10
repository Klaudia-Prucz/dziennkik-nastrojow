// tests/komponenty/Powiadomienie.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import Powiadomienie from '../../components/powiadomienie';

describe('Powiadomienie', () => {
  it('wyświetla tytuł i wiadomość', () => {
    const { getByText } = render(
      <Powiadomienie visible={true} title="Test" message="To jest test" onConfirm={() => {}} />
    );
    expect(getByText('Test')).toBeTruthy();
    expect(getByText('To jest test')).toBeTruthy();
  });
});
