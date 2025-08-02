"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import ErrorBoundary from './ErrorBoundary';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  
  // Always call usePathname - never conditionally
  const pathname = usePathname();

  // Ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/blogs', label: 'Blog Posts' },
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/settings', label: 'Settings' },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/admin" className="text-xl font-bold text-white">
                    Portfolio Admin
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map((item) => {
                    // Only compute active state after mounting to avoid hydration mismatch
                    const isActive = mounted && (item.exact 
                      ? pathname === item.href 
                      : pathname.startsWith(item.href));
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                          isActive
                            ? 'border-blue-500 text-white'
                            : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  View Site
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AdminLayout;
