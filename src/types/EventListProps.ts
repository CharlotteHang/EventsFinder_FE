import { Recommendation } from "./Recommendation";
import { Items } from "./ItemsType";

export interface EventListProps {
  events: Recommendation[];
  statuses: Items;
  categories: Items;
  startDate: string;
  endDate: string;
  startDistance: number;
  endDistance: number;
  isLoggedIn: boolean;
  handleAddFavorite: (id: string, addFavorite: boolean) => void;
  setLogoutState: () => void;
}
