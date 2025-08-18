"use client";
import { useState } from "react";
import { Lock } from "lucide-react";
import ChangePasswordModal from "./modal/changePassword";
import UserCard from "./components/userCard";
import Link from "next/link";
import { useUser } from "../context/userContext";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="p-6 bg-[#120c20] rounded-2xl">
      <h1 className="text-2xl text-white font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserCard />

        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">User Details</h3>
            <div className="flex gap-2">
              <Link
                href="/profile/edit"
                className="text-sm bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Edit Profile
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-sm bg-[#500091] text-white px-4 py-2 rounded-lg hover:bg-[#120c20]"
              >
                <Lock size={16} /> Change Password
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Username:</span> {user.username}</div>
            <div><span className="text-gray-500">Email:</span> {user.email}</div>
            <div><span className="text-gray-500">Phone:</span> {user.phone}</div>
            <div><span className="text-gray-500">Address:</span> {user.address}</div>
            <div><span className="text-gray-500">Region:</span> {user.region}</div>
            <div><span className="text-gray-500">Current Role:</span> {user.role}</div>
          </div>
        </div>
      </div>

      <ChangePasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
