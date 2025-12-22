import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rawPosts from "../data/samplePosts.json";
const defaultPosts = rawPosts as Post[];


// ---- TYPES ----
export type PostType = "volunteer" | "sponsor";

export interface Post {
  id: string;
  title: string;
  description: string;
  time: string;
  volunteers: string[];
  type: PostType;
  qrCode?: string | null;
}

interface ContextProps {
  posts: Post[];
  addPost: (p: Post) => void;
  deletePost: (id: string) => void;
  acceptVolunteer: (id: string, name: string) => void;
  clearPosts: () => void;
}

export const PostsContext = createContext<ContextProps>({
  posts: [],
  addPost: () => {},
  deletePost: () => {},
  acceptVolunteer: () => {},
  clearPosts: () => {},
});

const STORAGE_KEY = "USER_POSTS";

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load saved + defaults
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        let userPosts: Post[] = saved ? JSON.parse(saved) : [];

        // Merge default posts (always visible)
        setPosts([...defaultPosts, ...userPosts]);
      } catch (err) {
        console.log("Load error:", err);
      }
    };

    load();
  }, []);

  // Save only user-created posts
  useEffect(() => {
    const save = async () => {
      try {
        const userPosts = posts.filter(
          p => !defaultPosts.some(d => d.id === p.id)
        );

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts));
      } catch (err) {
        console.log("Save error:", err);
      }
    };

    save();
  }, [posts]);

  // ADD NEW POST
  const addPost = (post: Post) => {
    setPosts(prev => [...prev, post]);
  };

  // DELETE POST (cannot delete default)
  const deletePost = (id: string) => {
    if (defaultPosts.some(p => p.id === id)) {
      return; // block deleting default items
    }

    setPosts(prev => prev.filter(p => p.id !== id));
  };

  // ADD A VOLUNTEER
  const acceptVolunteer = (postId: string, volunteer: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, volunteers: [...p.volunteers, volunteer] }
          : p
      )
    );
  };

  // CLEAR ONLY USER POSTS
  const clearPosts = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setPosts(defaultPosts);
  };

  return (
    <PostsContext.Provider
      value={{ posts, addPost, deletePost, acceptVolunteer, clearPosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};
