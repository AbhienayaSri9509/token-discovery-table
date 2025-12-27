'use client';

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

interface PopoverProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const Popover = React.memo<PopoverProps>(
  ({ trigger, content, side = 'bottom', align = 'center' }) => {
    return (
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          {trigger}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side={side}
            align={align}
            className={cn(
              'z-50 w-72 rounded-md border border-gray-800 bg-gray-900 p-4 text-white shadow-md',
              'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
            )}
            sideOffset={5}
          >
            {content}
            <PopoverPrimitive.Arrow className="fill-gray-900" />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);

Popover.displayName = 'Popover';

