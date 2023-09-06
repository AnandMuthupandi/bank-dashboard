import { preprocessClientAccountsData } from '../utils/chartUtilities'

const clientAccounts = [{
    id: "6084118399e57e9b1e12ac45",
    card_type: "VISA",
    number: 402400,
    balance: 100,
    created: "2021-04-24 12:39:31+00:00"
}];
describe("Chart Utilities", () => {
  it("should not modify the data if the conditions are not met", () => {
    const inputData = [
      { id: "1", card_type: "VISA" },
      { id: "2", card_type: "MasterCard" },
    ];

    const outputData = preprocessClientAccountsData(clientAccounts);

    // Ensure that the output is the same as the input when conditions are not met
    expect(outputData).toEqual(inputData);
  });

  it("should modify the data if the conditions are met", () => {
    const inputData = [
      { id: "608577dc5bcabe685f68eb16", card_type: "VISA" },
      { id: "2", card_type: "MasterCard" },
    ];

    const outputData = preprocessClientAccountsData(inputData);

    // Ensure that the output data is modified as expected
    expect(outputData[0].card_type).toBe("extra-VISA");
    expect(outputData[1].card_type).toBe("MasterCard");
  });

  // Add more test cases as needed
});
