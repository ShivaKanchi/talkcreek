"use client";

import Talk from "@model/talk";
import { useEffect, useState } from "react";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const TalkCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <Talk key={post._id} post={post} handleTagClick={handleTagClick} />
        ))}
      </div>
    );
  };
  const handleSearchChange = (e) => {};
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/talk");
      const data = await response.json();
      setPosts(data);
    };
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a topic or a username"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      <TalkCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
