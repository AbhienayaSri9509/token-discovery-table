'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Token, SortField, SortDirection } from '@/types';
import { TokenRow } from '@/components/molecules/TokenRow';
import { TableHeader } from '@/components/molecules/TableHeader';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSort, setSelectedToken } from '@/lib/store/tableSlice';
import { useWebSocketMock } from '@/lib/hooks/useWebSocket';
import { PriceUpdate } from '@/types';
import { Modal } from '@/components/molecules/Modal';
import { formatCurrency, formatNumber, getPriceChangeColor } from '@/lib/utils';
import { Skeleton } from '@/components/atoms/Skeleton';

interface TokenTableProps {
  tokens: Token[];
  isLoading?: boolean;
}

function sortTokens(tokens: Token[], field: SortField, direction: SortDirection): Token[] {
  if (!field || !direction) return tokens;

  return [...tokens].sort((a, b) => {
    let aValue: any = a[field as keyof Token];
    let bValue: any = b[field as keyof Token];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export const TokenTable = React.memo<TokenTableProps>(({ tokens, isLoading }) => {
  const dispatch = useAppDispatch();
  const { sortField, sortDirection, selectedToken } = useAppSelector((state) => state.table);
  const [priceUpdates, setPriceUpdates] = useState<Map<string, { price: number; priceChange24h: number }>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePriceUpdate = useCallback((update: PriceUpdate) => {
    setPriceUpdates((prev) => {
      const newMap = new Map(prev);
      newMap.set(update.tokenId, {
        price: update.price,
        priceChange24h: update.priceChange24h,
      });
      return newMap;
    });
  }, []);

  useWebSocketMock(handlePriceUpdate);

  const handleSort = useCallback((field: SortField) => {
    let newDirection: SortDirection = 'asc';
    
    if (sortField === field) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
        field = null;
      }
    }

    dispatch(setSort({ field, direction: newDirection }));
  }, [dispatch, sortField, sortDirection]);

  const sortedTokens = useMemo(
    () => sortTokens(tokens, sortField, sortDirection),
    [tokens, sortField, sortDirection]
  );

  const handleTokenClick = useCallback((token: Token) => {
    dispatch(setSelectedToken(token));
    setIsModalOpen(true);
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(setSelectedToken(null));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Skeleton width="120px" height="16px" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Skeleton width="100px" height="16px" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Skeleton width="100px" height="16px" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Skeleton width="100px" height="16px" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Skeleton width="100px" height="16px" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Skeleton width="100px" height="16px" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    <Skeleton width="100px" height="16px" />
                    <Skeleton width="60px" height="14px" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    <Skeleton width="80px" height="16px" />
                    <Skeleton width="50px" height="14px" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Skeleton width="90px" height="16px" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width="90px" height="16px" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width="80px" height="24px" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width="70px" height="16px" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900/50">
            <tr>
              <TableHeader
                label="Token"
                field="name"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                label="Price"
                field="price"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                label="24h Volume"
                field="volume24h"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                label="Liquidity"
                field="liquidity"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                label="Category"
                field="category"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                label="Chain"
                field="chain"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedTokens.map((token) => {
              const update = priceUpdates.get(token.id);
              return (
                <TokenRow
                  key={token.id}
                  token={token}
                  price={update?.price}
                  priceChange24h={update?.priceChange24h}
                  onTokenClick={handleTokenClick}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedToken && (
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={`${selectedToken.name} (${selectedToken.symbol})`}
          description="Token Details"
        >
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Price</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(selectedToken.price)}
                </p>
                <p className={`text-sm ${getPriceChangeColor(selectedToken.priceChange24h)}`}>
                  {selectedToken.priceChange24h >= 0 ? '+' : ''}
                  {selectedToken.priceChange24h.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">24h Volume</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(selectedToken.volume24h)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Liquidity</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(selectedToken.liquidity)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Chain</p>
                <p className="text-lg font-semibold">{selectedToken.chain}</p>
              </div>
              {selectedToken.marketCap && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Market Cap</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(selectedToken.marketCap)}
                  </p>
                </div>
              )}
              {selectedToken.holders && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Holders</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(selectedToken.holders)}
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Pair Address</p>
              <p className="text-sm font-mono break-all bg-gray-800 p-2 rounded">
                {selectedToken.pairAddress}
              </p>
            </div>
            {selectedToken.migratedFrom && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Migrated From</p>
                <p className="text-sm">{selectedToken.migratedFrom}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
});

TokenTable.displayName = 'TokenTable';

