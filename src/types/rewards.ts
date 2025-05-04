
export interface Brand {
    id: number;
    name: string;
    logo: string;
    address: string;
  }
  
 export  interface RewardItem {
    id: number;
    brand: Brand;
    points: number;
    description: string;
    claimed: boolean;
  }