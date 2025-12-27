'use client';

import { useQuery } from '@tanstack/react-query';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

const fetchTokens = async (): Promise<Token[]> => {
  // mock data – replace with API later
  return [
    {
      id: '1',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3200,
      change: 2.3,
    },
    {
      id: '2',
      name: 'Solana',
      symbol: 'SOL',
      price: 145,
      change: -1.1,
    },
  ];
};

export const useTokenData = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
  });
};
