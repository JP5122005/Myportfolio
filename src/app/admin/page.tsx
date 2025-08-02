"use client";

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogPosts: 0,
    projects: 0,
    publishedBlogs: 0,
    publishedProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchWithFallback = async (url: string) => {
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return Array.isArray(data) ? data : [];
          } catch (error) {
            console.warn(`Failed to fetch ${url}:`, error);
            return [];
          }
        };

        const [allBlogs, allProjects, publishedBlogs, publishedProjects] = await Promise.all([
          fetchWithFallback('/api/admin/blogs'),
          fetchWithFallback('/api/admin/projects'),
          fetchWithFallback('/api/admin/blogs?published=true'),
          fetchWithFallback('/api/admin/projects?published=true'),
        ]);

        setStats({
          blogPosts: allBlogs.length,
          projects: allProjects.length,
          publishedBlogs: publishedBlogs.length,
          publishedProjects: publishedProjects.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: 'Total Blog Posts',
      value: stats.blogPosts,
      subtitle: `${stats.publishedBlogs} published`,
      color: 'bg-blue-600',
    },
    {
      title: 'Total Projects',
      value: stats.projects,
      subtitle: `${stats.publishedProjects} published`,
      color: 'bg-green-600',
    },
    {
      title: 'Published Content',
      value: stats.publishedBlogs + stats.publishedProjects,
      subtitle: 'Total public items',
      color: 'bg-purple-600',
    },
    {
      title: 'Draft Content',
      value: (stats.blogPosts - stats.publishedBlogs) + (stats.projects - stats.publishedProjects),
      subtitle: 'Unpublished items',
      color: 'bg-yellow-600',
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
            <strong className="font-bold">Warning:</strong>
            <span className="block sm:inline"> {error}</span>
            <p className="text-sm mt-2">Some statistics may not be accurate. Try refreshing the page.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 ${card.color} rounded-md flex items-center justify-center`}>
                      <span className="text-white font-bold">{card.value}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-300 truncate">
                        {card.title}
                      </dt>
                      <dd className="text-lg font-semibold text-white">
                        {card.value}
                      </dd>
                      <dd className="text-sm text-gray-400">
                        {card.subtitle}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/admin/blogs/new"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block text-center transition-colors"
              >
                Create New Blog Post
              </a>
              <a
                href="/admin/projects/new"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md inline-block text-center transition-colors"
              >
                Create New Project
              </a>
              <a
                href="/admin/settings"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md inline-block text-center transition-colors"
              >
                Manage Settings
              </a>
            </div>
          </div>

          <div className="bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="text-gray-400">
              <p>Welcome to your portfolio admin panel!</p>
              <p className="mt-2">Use the navigation above to manage your blog posts, projects, and site settings.</p>
              <p className="mt-2 text-sm">Database: Connected to Neon PostgreSQL ✅</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
