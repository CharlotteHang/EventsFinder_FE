export interface Items {
  [key: string]: boolean;
}

export interface ItemProp {
  itemName: string
  items: Items;
  handleItemsChange: (
    name: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectAllItems: (
    selectAll: boolean
  ) => (event: React.MouseEvent<unknown>) => void;
}
