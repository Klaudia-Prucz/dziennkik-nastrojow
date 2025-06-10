import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { WpisyProvider, useWpisy } from '../../konteksty/WpisyContext';
import { act } from 'react-test-renderer';

jest.mock('../supabaseClient', () => {
  const mockInsert = jest.fn();
  const mockSelect = jest.fn();

  return {
    supabase: {
      auth: {
        getUser: jest.fn(() =>
          Promise.resolve({
            data: { user: { id: 'test-user-id' } },
            error: null,
          })
        ),
      },
      from: jest.fn(() => ({
        select: mockSelect,
        insert: mockInsert,
        eq: function () {
          return this;
        },
        order: function () {
          return this;
        },
      })),
    },
  };
});

import { supabase } from '../../supabaseClient';

const TestComponent = () => {
  const { zapiszWpis, odswiezWpisy, wpisy } = useWpisy();

  React.useEffect(() => {
    zapiszWpis({ mood: 'happy', note: 'Test', summary: 'Dobrze' });
    odswiezWpisy();
  }, []);

  return <>{wpisy.length > 0 && <Text testID="has-wpisy">Wpisy są</Text>}</>;
};

describe('WpisyContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('zapiszWpis wywołuje supabase.insert z danymi', async () => {
    const { insert } = supabase.from();

    await act(async () => {
      render(
        <WpisyProvider>
          <TestComponent />
        </WpisyProvider>
      );
    });

    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        mood: 'happy',
        note: 'Test',
        summary: 'Dobrze',
        user_id: 'test-user-id',
      })
    );
  });

  it('odswiezWpisy aktualizuje wpisy', async () => {
    const mockData = [{ id: 1, mood: 'happy', date: '2024-06-10T10:00:00Z' }];
    supabase.from().select.mockResolvedValueOnce({ data: mockData, error: null });

    const { getByTestId } = render(
      <WpisyProvider>
        <TestComponent />
      </WpisyProvider>
    );

    await waitFor(() => expect(getByTestId('has-wpisy')).toBeTruthy());
  });
});
