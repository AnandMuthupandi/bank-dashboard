import { IClientAccounts } from "../interfaces/types";

export function preprocessClientAccountResponse(
  data: IClientAccounts[]
): IClientAccounts[] {
  return data.map((item) => {
    if (item.id === "608577dc5bcabe685f68eb16" && item.card_type === "VISA") {
      return { ...item, card_type: `extra-${item.card_type}` };
    } else {
      return item;
    }
  });
}
