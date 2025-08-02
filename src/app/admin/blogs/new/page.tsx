"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

const NewBlogPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    uid: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    hoverImageUrl: '',
    hoverImageAlt: '',
    content: '',
    tags: '',
    published: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const slices = formData.content ? [{
        slice_type: "text_block",
        variation: "default",
        primary: {
          text: [{
            type: "paragraph",
            text: formData.content
          }]
        }
      }] : [];

      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: formData.uid,
          title: formData.title,
          date: formData.date,
          hoverImageUrl: formData.hoverImageUrl || null,
          hoverImageAlt: formData.hoverImageAlt || null,
          slices,
          tags: tagsArray,
          published: formData.published,
        }),
      });

      if (response.ok) {
        router.push('/admin/blogs');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Create New Blog Post</h1>
        
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="uid" className="block text-sm font-medium text-gray-300 mb-2">
                UID (URL identifier)
              </label>
              <input
                type="text"
                id="uid"
                name="uid"
                required
                value={formData.uid}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., my-blog-post"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="hoverImageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Image URL (optional)
              </label>
              <input
                type="url"
                id="hoverImageUrl"
                name="hoverImageUrl"
                value={formData.hoverImageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="hoverImageAlt" className="block text-sm font-medium text-gray-300 mb-2">
                Image Alt Text (optional)
              </label>
              <input
                type="text"
                id="hoverImageAlt"
                name="hoverImageAlt"
                value={formData.hoverImageAlt}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog post content here..."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Next.js, Web Development"
              />
            </div>

            <div>
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="mr-2"
                />
                Published
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-2 rounded-md transition-colors"
              >
                {loading ? 'Creating...' : 'Create Blog Post'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/blogs')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewBlogPost;
