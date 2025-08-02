"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { BlogPost } from '@/db/schema';

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOnlyPublished, setShowOnlyPublished] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/blogs${showOnlyPublished ? '?published=true' : ''}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.error('Unexpected response format:', data);
        setError('Unexpected response format from server');
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [showOnlyPublished]);

  const handleDelete = async (uid: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blogs/${uid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setBlogs(blogs.filter(blog => blog.uid !== uid));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert(`Error deleting blog post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const togglePublished = async (uid: string, currentStatus: boolean) => {
    try {
      const blog = blogs.find(b => b.uid === uid);
      if (!blog) return;

      const response = await fetch(`/api/admin/blogs/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blog,
          published: !currentStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setBlogs(blogs.map(b => 
        b.uid === uid ? { ...b, published: !currentStatus } : b
      ));
    } catch (error) {
      console.error('Error updating blog:', error);
      alert(`Error updating blog post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={fetchBlogs}
            className="mt-2 bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          <Link
            href="/admin/blogs/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Create New Post
          </Link>
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={showOnlyPublished}
              onChange={(e) => setShowOnlyPublished(e.target.checked)}
              className="mr-2"
            />
            Show only published posts
          </label>
        </div>

        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {blogs.map((blog) => (
                <tr key={blog.uid}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {blog.title}
                    </div>
                    <div className="text-sm text-gray-400">
                      UID: {blog.uid}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {blog.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                        blog.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                      onClick={() => togglePublished(blog.uid, blog.published)}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {Array.isArray(blog.tags) ? blog.tags.join(', ') : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/blog/${blog.uid}`}
                      className="text-blue-400 hover:text-blue-300 mr-4"
                      target="_blank"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/blogs/${blog.uid}`}
                      className="text-indigo-400 hover:text-indigo-300 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.uid)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {blogs.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No blog posts found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogsManagement;
