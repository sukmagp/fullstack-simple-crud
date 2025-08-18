"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface DetailPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export default function DetailPostModal({
  isOpen,
  onClose,
  post,
}: DetailPostModalProps) {
  if (!post) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
              <Dialog.Title className="text-lg font-bold">
                {post.title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-700 whitespace-pre-line">
                {post.content}
              </Dialog.Description>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
