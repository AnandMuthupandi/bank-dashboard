import { IClientAccounts } from "../interfaces/types";

export function preprocessClientAccountData(
  data: IClientAccounts[]
): IClientAccounts[] {
  console.log("data", data);

  const cardTypeCounts: Record<string, number> = {};
  return data.map((item) => {
    const { card_type } = item;
    if (!cardTypeCounts[card_type]) {
      cardTypeCounts[card_type] = 1;
      return { ...item };
    } else {
      const suffix = ++cardTypeCounts[card_type];
      return { ...item, card_type: `${card_type}(${suffix})` };
    }
  });
}
