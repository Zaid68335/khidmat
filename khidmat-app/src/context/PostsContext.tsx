import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import defaultPostsJson from "../data/samplePosts.json";

// Post interface
export interface Post {
  id: string;
  title: string;
  description: string;
  time: string;
  volunteers: string[];
}

// Convert JSON to typed Post[]
const DEFAULT_POSTS: Post[] = defaultPostsJson as Post[];

// Context interface
interface ContextProps {
  posts: Post[];
  addPost: (post: Post) => void;
  acceptVolunteer: (postId: string, volunteer: string) => void;
  clearPosts: () => void;
  deletePost: (postId: string) => void;
}

export const PostsContext = createContext<ContextProps>({
  posts: [],
  addPost: () => {},
  acceptVolunteer: () => {},
  clearPosts: () => {},
  deletePost: () => {},
});

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const STORAGE_KEY = "posts";
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS);

  // Load saved posts and merge with defaults
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);

        if (!raw) {
          setPosts(DEFAULT_POSTS);
          return;
        }

        const storedPosts: Post[] = JSON.parse(raw);

        setPosts([...DEFAULT_POSTS, ...storedPosts]);
      } catch (error) {
        console.log("Load error:", error);
      }
    };

    loadPosts();
  }, []);

  // Save user-created posts only
  useEffect(() => {
    const savePosts = async () => {
      try {
        const userPosts = posts.filter(
          (p) => !DEFAULT_POSTS.some((d) => d.id === p.id)
        );

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts));
      } catch (error) {
        console.log("Save error:", error);
      }
    };

    savePosts();
  }, [posts]);

  // Add new post
  const addPost = (post: Post) => {
    setPosts((prev) => [...prev, post]);
  };

  // Accept volunteer
  const acceptVolunteer = (postId: string, volunteer: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, volunteers: [...p.volunteers, volunteer] }
          : p
      )
    );
  };

  // Delete user-created posts only
  const deletePost = (postId: string) => {
    if (DEFAULT_POSTS.some((d) => d.id === postId)) return;

    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  // Clear only user-created posts
  const clearPosts = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setPosts(DEFAULT_POSTS);
    } catch (error) {
      console.log("Clear error:", error);
    }
  };

  return (
    <PostsContext.Provider
      value={{ posts, addPost, acceptVolunteer, clearPosts, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
