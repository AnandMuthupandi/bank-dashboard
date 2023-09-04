import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../src/components/common/Sidebar';

const mockAssets = {
    images: {
        logo: "../../src/assets/images/bank-logo.png", 
        zeroAccount: "../../src/assets/images/bank-logo.png"
    },
  };
// Mock the appRoutes that you expect to be used in your Sidebar
const mockAppRoutes = [
  { path: '/', sidebarProps: { text: 'Home' } },
  { path: '/dashboard', sidebarProps: { text: 'Dashboard' } },
  // Add more route objects as needed
];

// Mock the Empty Accounts component
jest.mock("../../src/components/common/SidebarItem", () => () => (
    <div data-testid="mock-sidebarItem">Home,Dashboard</div>
  ));
    
  jest.mock("../../src/assets", () => ({
    ...mockAssets,
  }));

describe('Sidebar Component', () => {
  it('renders the Sidebar component', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Check if the Sidebar component is rendered
    const avatarElement = screen.getByAltText("Logo");
    expect(avatarElement).toBeInTheDocument();
    const sidebarElement = screen.getByTestId('mock-sidebarItem');
    expect(sidebarElement).toBeInTheDocument();
  });

  it('renders sidebar items based on appRoutes', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Check if sidebar items are rendered based on the mockAppRoutes
    mockAppRoutes.forEach((route) => {
      const sidebarItemElement = screen.getByText(route.sidebarProps.text);
      expect(sidebarItemElement).toBeInTheDocument();
    });
  });
});
