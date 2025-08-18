"use client";
import { useState } from "react";
import PostForm from "@/components/postForm";
import PostList from "@/components/postList";
import ConfirmDeleteModal from "@/components/modal/confirmDelete";
import EditPostModal from "@/components/modal/editPost";
import DetailPostModal from "@/components/modal/detailPost";
import { usePosts } from "@/hooks/usePosts";
import type { Post } from "@/types/post";

export default function DashboardClient() {
  const { posts, loading, message, add, remove, edit, refresh } = usePosts();
  const [refreshing, setRefreshing] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleAdd = async (p: Omit<Post, "id">) => add(p);

  const handleDelete = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedPost) {
      await remove(selectedPost.id);
      setShowDeleteModal(false);
      setSelectedPost(null);
    }
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const saveEdit = async (updated: Post) => {
    await edit(updated);
    setShowEditModal(false);
    setSelectedPost(null);
  };

  const handleDetail = (post: Post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#120c20] rounded-2xl shadow p-6">
        <h2 className="text-lg text-white font-semibold mb-4">Add Post</h2>
        <PostForm onSubmit={handleAdd} />
      </div>

      <div className="bg-[#120c20] rounded-2xl shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-white font-semibold">List Post</h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-3 py-1 text-white rounded-lg border border-white hover:bg-white hover:text-[#120c20] flex items-center gap-2"
          >
            {refreshing && (
              <span className="w-4 h-4 border-2 border-[#120c20] border-t-transparent rounded-full animate-spin"/>
            )}
            Refresh
          </button>
        </div>

        <div className="mt-4 min-h-[200px] flex items-center justify-center">
          {loading ? (
            <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <PostList
              posts={posts}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onDetail={handleDetail}
            />
          )}
        </div>

        {message && <p className="text-sm text-gray-400 mt-2">{message}</p>}
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={saveEdit}
        post={selectedPost}
      />

      <DetailPostModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        post={selectedPost}
      />
    </div>
  );
}
