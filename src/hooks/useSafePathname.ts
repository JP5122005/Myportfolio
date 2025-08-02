"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useSafePathname() {
  const [pathname, setPathname] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let currentPathname = '';
  
  try {
    if (isClient) {
      currentPathname = usePathname();
    }
  } catch (error) {
    console.warn('Error getting pathname:', error);
    currentPathname = pathname || '/admin';
  }

  useEffect(() => {
    if (isClient && currentPathname) {
      setPathname(currentPathname);
    }
  }, [isClient, currentPathname]);

  return pathname || '/admin';
}
