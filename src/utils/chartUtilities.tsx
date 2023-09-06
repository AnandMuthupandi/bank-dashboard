import { IClientAccounts } from "../interfaces/types";

export const chartColors = [
  "#e0ac2b",
  "#e85252",
  "#6689c6",
  "#9a6fb0",
  "#a53253",
  "#69b3a2",
];

export const margins = {
  MARGIN_X: 150,
  MARGIN_Y: 50,
  INFLEXION_PADDING: 20,
  width: 400,
  height: 200,
};

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
