"use client";
import { useState, useRef } from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/app/context/userContext";

export default function UserCard() {
  const [avatar, setAvatar] = useState("/avatar.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow p-6 relative">
      <div className="relative">
        <Image
          src={avatar}
          alt=""
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleAvatarClick}
          className="absolute bottom-2 right-2 bg-[#500091] text-white p-2 rounded-full shadow hover:bg-[#171717]"
        >
          <Pencil size={16} />
        </button>
      </div>
      <h2 className="mt-4 font-semibold text-lg text-[#500091]">{user.name}</h2>
      <p className="font-reguler text-sm">{user.role}</p>
    </div>
  );
}
