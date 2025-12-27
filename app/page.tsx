'use client';

import React from 'react';
import { TokenTable } from '@/components/organisms/TokenTable';
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';
import { useTokenData } from '@/lib/hooks/useTokenData';

export default function Home() {
  const { data: tokens = [], isLoading, error } = useTokenData();

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Token Discovery Table
          </h1>
          <p className="text-gray-400">
            Real-time token prices and trading information
          </p>
        </div>

        <ErrorBoundary>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
            <TokenTable tokens={tokens} isLoading={isLoading} />
          </div>
        </ErrorBoundary>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            Error loading tokens. Please try again later.
          </div>
        )}
      </div>
    </main>
  );
}

