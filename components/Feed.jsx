"use client";

import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
const TalkCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <TopicCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [posts, setPosts] = useState([]);
  // Search
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/talk");
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const filterTopics = (searchText) => {
    const searchRegex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        searchRegex.test(post.creator.username) ||
        searchRegex.test(post.tag) ||
        searchRegex.test(post.topic)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // Debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTopics(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagname) => {
    setSearchText(tagname);
    const searchResult = filterTopics(tagname);
    setSearchedResults(searchResult);
  };

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
      {/*  */}
      <TalkCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
