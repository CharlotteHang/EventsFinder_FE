export interface Recommendation {
  itemId: string;
  name: string;
  rating: number; // rank
  address: string;
  categories: Category[];
  imageUrl: string;
  url: string;
  distance: number;
  favorite: boolean;

  localDate: string;
  time: string;
  type: string;
  status: string;
}

export interface RecommendationResponse {
  data: Recommendation[];
  errors: string[];
  missingFields: string[];
}

export interface Category {
  categoryType: string;
}
