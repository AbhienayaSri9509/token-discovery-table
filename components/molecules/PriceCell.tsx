'use client';

import React, { useEffect, useState } from 'react';
import { cn, formatCurrency, getPriceChangeColor, getPriceChangeBgColor } from '@/lib/utils';
import { Token } from '@/types';

interface PriceCellProps {
  token: Token;
  price?: number;
  priceChange24h?: number;
}

export const PriceCell = React.memo<PriceCellProps>(
  ({ token, price, priceChange24h }) => {
    const [displayPrice, setDisplayPrice] = useState(price ?? token.price);
    const [displayChange, setDisplayChange] = useState(priceChange24h ?? token.priceChange24h);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
      if (price !== undefined && price !== displayPrice) {
        setIsUpdating(true);
        setDisplayPrice(price);
        setTimeout(() => setIsUpdating(false), 300);
      }
    }, [price, displayPrice]);

    useEffect(() => {
      if (priceChange24h !== undefined && priceChange24h !== displayChange) {
        setDisplayChange(priceChange24h);
      }
    }, [priceChange24h, displayChange]);

    return (
      <div className="flex flex-col gap-1">
        <span className={cn(
          'text-sm font-medium price-update',
          isUpdating && getPriceChangeBgColor(displayChange),
          'transition-colors duration-300'
        )}>
          {formatCurrency(displayPrice)}
        </span>
        <span className={cn('text-xs', getPriceChangeColor(displayChange))}>
          {displayChange >= 0 ? '+' : ''}{displayChange.toFixed(2)}%
        </span>
      </div>
    );
  }
);

PriceCell.displayName = 'PriceCell';

