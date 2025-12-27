import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export const Skeleton = React.memo<SkeletonProps>(
  ({ className, width, height, ...props }) => {
    return (
      <div
        className={cn('skeleton rounded', className)}
        style={{ width, height }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

