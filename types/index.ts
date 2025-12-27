export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  category: 'new-pairs' | 'final-stretch' | 'migrated';
  chain: string;
  pairAddress: string;
  marketCap?: number;
  holders?: number;
  createdAt: string;
  migratedFrom?: string;
}

export interface TokenTableColumn {
  id: keyof Token | string;
  label: string;
  sortable: boolean;
  width?: string;
}

export type SortDirection = 'asc' | 'desc' | null;
export type SortField = keyof Token | null;

export interface TableState {
  sortField: SortField;
  sortDirection: SortDirection;
  selectedToken: Token | null;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
}

