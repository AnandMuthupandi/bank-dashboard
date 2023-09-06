import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux'; // Assuming you use Redux for state management
import { MemoryRouter } from 'react-router-dom'; // For testing routing
import SidebarItem from '../components/common/SidebarItem';
import configureMockStore from 'redux-mock-store';

// Mock the useSelector function to provide a sample state for testing
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('SidebarItem', () => {
  // Sample route data
  const item = {
    sidebarProps: {
      icon: <div data-testid="DashboardIcon" />,
      displayText: 'Dashboard',
    },
    path: "/dashboard",
    state: "dashboard",
  };

  const mockStore = configureMockStore([]);
const initialState = {
    appState: '', 
    
  };
  const store = mockStore(initialState);
  
//   const store = mockStore(initialState);

  it('renders SidebarItem with active state', () => {
    // Mock useSelector to provide the active state
    useSelector.mockReturnValue({ appState: 'dashboard' });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={item} />
        </MemoryRouter>
      </Provider>
    );

    // Check if the icon and text are rendered
    expect(screen.getByTestId('DashboardIcon')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    // You can add more specific assertions for styling or routing behavior
  });

  it('renders SidebarItem without active state', () => {
    // Mock useSelector to provide a different state
    useSelector.mockReturnValue({ appState: 'anotherState' });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={item} />
        </MemoryRouter>
      </Provider>
    );

    // Check if the icon and text are rendered
    expect(screen.getByTestId('DashboardIcon')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    // You can add more specific assertions for styling or routing behavior
  });

  it('does not render SidebarItem when path is missing', () => {
    const itemWithoutPath = { ...item, path: undefined };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={itemWithoutPath} />
        </MemoryRouter>
      </Provider>
    );

    // Check if the SidebarItem is not rendered
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.queryByText('Sample Item')).not.toBeInTheDocument();
  });

  it('does not render SidebarItem when sidebarProps are missing', () => {
    const itemWithoutProps = { ...item, sidebarProps: undefined };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={itemWithoutProps} />
        </MemoryRouter>
      </Provider>
    );

    // Check if the SidebarItem is not rendered
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.queryByText('Sample Item')).not.toBeInTheDocument();
  });
});