import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Post interface
export interface Post {
  id: string;
  title: string;
  description: string;
  time: string;
  volunteers: string[];
}

// dummy values or default posts (ALWAYS visible)
const DEFAULT_POSTS: Post[] = [
  {
    id: "1",
    title: "Food preparation - BREAKFAST",
    description: "Need volunteers to help cook and distribute food.",
    time: "08:30 AM",
    volunteers: [],
  },
  {
    id: "2",
    title: "Clothes Donation Drive",
    description: "Sorting and organizing donated clothes.",
    time: "12:00 PM",
    volunteers: [],
  },
  {
    id: "3",
    title: "Evening Service Help",
    description: "Assist elders with evening meals.",
    time: "06:45 PM",
    volunteers: [],
  },
];

// Context interface
interface ContextProps {
  posts: Post[];
  addPost: (post: Post) => void;
  acceptVolunteer: (postId: string, volunteer: string) => void;
  clearPosts: () => void;
  deletePost: (postId: string) => void;
}

// Create Context
export const PostsContext = createContext<ContextProps>({
  posts: [],
  addPost: () => {},
  acceptVolunteer: () => {},
  clearPosts: () => {},
  deletePost: () => {},
});

// Provider
export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const STORAGE_KEY = "posts";
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS);

  // Load stored posts + merge with defaults
  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const stored: Post[] = JSON.parse(raw);
          // merge defaults + stored
          setPosts([...DEFAULT_POSTS, ...stored]);
        }
      } catch (e) {
        console.log("Load error:", e);
      }
    };
    load();
  }, []);

  // Save ONLY user-created posts, NOT defaults
  useEffect(() => {
    const save = async () => {
      try {
        // Filter out default posts so they do not get saved
        const userPosts = posts.filter(
          (p) => !DEFAULT_POSTS.some((d) => d.id === p.id)
        );
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts));
      } catch (e) {
        console.log("Save error:", e);
      }
    };
    save();
  }, [posts]);

  // Add a new post
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

  // Delete post (still cannot delete hardcoded posts)
  const deletePost = (postId: string) => {
    // Prevent deletion of default posts
    if (DEFAULT_POSTS.some((d) => d.id === postId)) return;

    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  // Clear user-created posts but keep defaults
  const clearPosts = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setPosts(DEFAULT_POSTS);
    } catch (e) {
      console.log("Clear error:", e);
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
