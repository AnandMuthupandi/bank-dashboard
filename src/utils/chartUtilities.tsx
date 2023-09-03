import { IClientAccounts } from "../interfaces/types";

export function preprocessClientAccountData(
  data: IClientAccounts[]
): IClientAccounts[] {
  const cardTypeCounts: Record<string, number> = {};

  // Loop through the data and add numeric suffixes to duplicates
  return data.map((item) => {
    const { card_type } = item;
    if (!cardTypeCounts[card_type]) {
      // First occurrence, no suffix needed
      cardTypeCounts[card_type] = 1;
      return { ...item };
    } else {
      // Duplicate, add a numeric suffix
      const suffix = ++cardTypeCounts[card_type];
      return { ...item, card_type: `${card_type}(${suffix})` };
    }
  });
}
