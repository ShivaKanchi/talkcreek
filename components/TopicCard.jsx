"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TopicCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator.username}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {post.creator.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
