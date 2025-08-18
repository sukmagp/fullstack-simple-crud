"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/userContext";
import toast from "react-hot-toast";

export default function EditProfileForm() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (JSON.stringify(formData) === JSON.stringify(user)) {
      toast.error("No changes were made");
      return;
    }

    await toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Saving changes...",
        success: "Profile updated successfully!",
        error: "Failed to update profile",
      }
    );

    setUser(formData);
    router.push("/profile");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            name={key}
            value={value}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() =>router.push("/profile")}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#500091] text-white px-4 py-2 rounded-lg hover:bg-[#171717]"
        >
          Save
        </button>
      </div>
    </form>
  );
}
