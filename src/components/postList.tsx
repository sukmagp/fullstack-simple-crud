"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
  onDetail: (post: Post) => void;
}

export default function PostList({
  posts,
  onDelete,
  onEdit,
  onDetail,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-gray-600 bg-white shadow-md rounded-2xl p-8 m-6">
        There are no posts yet, let`s add some!
      </p>
    );
  }

  return (
    <div className="rounded-2xl m-6">
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 shadow-sm rounded-xl p-4 flex justify-between items-start border"
          >
            <div>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
            </div>
            <div className="flex gap-2 p-4">
              <button
                onClick={() => onDetail(post)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                title="Detail"
              >
                <Eye className="w-5 h-5" />
              </button>

              <button
                onClick={() => onEdit(post)}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                title="Edit"
              >
                <Pencil className="w-5 h-5" />
              </button>

              <button
                onClick={() => onDelete(post.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                title="Hapus"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
