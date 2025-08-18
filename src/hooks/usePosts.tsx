"use client";
import { useEffect, useState } from "react";
import { createPost, deletePost, listPosts, updatePost } from "@/lib/api";
import type { NewPost, Post } from "@/types/post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listPosts();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const add = async (p: NewPost) => {
    const created = await createPost(p);
    setPosts(prev => [created, ...prev]);
    setMessage("Post added");
  };

  const remove = async (id: number) => {
    await deletePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
    setMessage("Post deleted");
  };

  const edit = async (post: Post) => {
    const updated = await updatePost(post.id, { title: post.title, content: post.content, userId: post.userId });
    setPosts(prev => prev.map(p => (p.id === post.id ? updated : p)));
    setMessage("Post updated");
  };

  return { posts, loading, message, add, remove, edit, refresh };
}
