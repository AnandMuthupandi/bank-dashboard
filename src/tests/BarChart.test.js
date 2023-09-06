import React from 'react';
import { render,screen } from '@testing-library/react';
import BarChart from '../components/barChart/BarChart';

const clientAccounts = [{
    id: "6084118399e57e9b1e12ac45",
    card_type: "VISA",
    number: 402400,
    balance: 100,
    created: "2021-04-24 12:39:31+00:00"
}]; 
const cardTypes = [{
    id: "6084118399e57e9b1e12ac45",
    card_type: "VISA",
    number: 402400,
    balance: 100,
    created: "2021-04-24 12:39:31+00:00"
}]; 
const selectedSegment = "Balance >=0"; // Replace with your selected segment
describe('BarChart component', () => {
  it('renders AxisBottom with the correct props', () => {
    

    // Render the BarChart component
    render(
      <BarChart
        clientAccounts={clientAccounts}
        cardTypes={cardTypes}
        selectedSegment={selectedSegment}
      />
    );

    // Find the AxisBottom component by its data-testid
    const axisBottomElement = screen.getByText('VISA');

    // Replace these assertions with your actual props verification
    expect(axisBottomElement).toBeInTheDocument();
    // You can check for specific props you pass to AxisBottom as well
    // For example, if you pass a scale prop, you can check its value.
    // expect(axisBottomElement).toHaveAttribute('data-scale', 'yourScaleValue');
  });
  it('displays Bars with data', () => {
    

   render(
      <BarChart
        clientAccounts={clientAccounts}
        cardTypes={cardTypes}
        selectedSegment={selectedSegment}
      />
    );

    const barsElement = screen.getByTestId('Bars');
    expect(barsElement).toBeInTheDocument();
    
    // You can add more specific assertions based on the rendered Bars
    // For example, check if the correct number of bars are rendered.
  });
});
