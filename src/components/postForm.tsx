"use client";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

interface PostFormData {
  title: string;
  content: string;
}

interface PostFormProps {
  onSubmit: (post: PostFormData) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required!");
      return;
    }

    onSubmit({ title, content });

    setTitle("");
    setContent("");
    toast.success("Post successfully added!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-4 mb-6 m-6"
    >
      <h2 className="text-lg font-semibold mb-4">Add Posting here</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-1 focus:ring-[#500091]"
      />
      <textarea
        placeholder="Content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-1 focus:ring-[#500091]"
      />
      <button
        type="submit"
        className="bg-[#500091] text-white px-4 py-2 rounded-lg hover:bg-[#120c20]"
      >
        Posting
      </button>
    </form>
  );
}
