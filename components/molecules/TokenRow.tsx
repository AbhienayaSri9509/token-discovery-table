'use client';

import React from 'react';
import { Token } from '@/types';
import { PriceCell } from './PriceCell';
import { cn, formatCurrency, formatNumber, getPriceChangeColor } from '@/lib/utils';
import { Popover } from './Popover';
import { Button } from '@/components/atoms/Button';

interface TokenRowProps {
  token: Token;
  price?: number;
  priceChange24h?: number;
  onTokenClick: (token: Token) => void;
}

export const TokenRow = React.memo<TokenRowProps>(
  ({ token, price, priceChange24h, onTokenClick }) => {
    const handleRowClick = () => {
      onTokenClick(token);
    };

    const tokenInfoContent = (
      <div className="space-y-2">
        <div>
          <p className="text-xs text-gray-400">Symbol</p>
          <p className="font-semibold">{token.symbol}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Chain</p>
          <p>{token.chain}</p>
        </div>
        {token.migratedFrom && (
          <div>
            <p className="text-xs text-gray-400">Migrated From</p>
            <p>{token.migratedFrom}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-gray-400">Pair Address</p>
          <p className="text-xs font-mono">{token.pairAddress}</p>
        </div>
      </div>
    );

    return (
      <tr
        className={cn(
          'border-b border-gray-800 hover:bg-gray-800/30 transition-colors cursor-pointer',
          'group'
        )}
        onClick={handleRowClick}
      >
        <td className="px-4 py-3 whitespace-nowrap">
          <Popover
            trigger={
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{token.name}</span>
                  <span className="text-xs text-gray-400">{token.symbol}</span>
                </div>
              </div>
            }
            content={tokenInfoContent}
          />
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <PriceCell
            token={token}
            price={price}
            priceChange24h={priceChange24h}
          />
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
          {formatCurrency(token.volume24h)}
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
          {formatCurrency(token.liquidity)}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            token.category === 'new-pairs' && 'bg-blue-500/20 text-blue-400',
            token.category === 'final-stretch' && 'bg-orange-500/20 text-orange-400',
            token.category === 'migrated' && 'bg-purple-500/20 text-purple-400'
          )}>
            {token.category === 'new-pairs' && 'New Pairs'}
            {token.category === 'final-stretch' && 'Final Stretch'}
            {token.category === 'migrated' && 'Migrated'}
          </span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
          {token.chain}
        </td>
      </tr>
    );
  }
);

TokenRow.displayName = 'TokenRow';

