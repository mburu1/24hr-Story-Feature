import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Helper function to check if a story has expired
const isStoryExpired = (timestamp) => {
  return Date.now() - timestamp > TWENTY_FOUR_HOURS;
};

// Helper function to clean expired stories
const cleanExpiredStories = (stories) => {
  return stories.filter(story => !isStoryExpired(story.timestamp));
};

export const useStoriesStore = create(
  persist(
    (set, get) => ({
      stories: [],
      currentViewingStory: null,
      currentStoryIndex: 0,

      // Add a new story
      addStory: (imageData) => {
        const newStory = {
          id: Date.now().toString(),
          image: imageData,
          timestamp: Date.now(),
          viewed: false,
        };

        set((state) => ({
          stories: [newStory, ...cleanExpiredStories(state.stories)],
        }));
      },

      // Remove a story by ID
      removeStory: (storyId) => {
        set((state) => ({
          stories: state.stories.filter(story => story.id !== storyId),
        }));
      },

      // Mark a story as viewed
      markAsViewed: (storyId) => {
        set((state) => ({
          stories: state.stories.map(story =>
            story.id === storyId ? { ...story, viewed: true } : story
          ),
        }));
      },

      // Set the currently viewing story
      setCurrentViewingStory: (story, index) => {
        set({ currentViewingStory: story, currentStoryIndex: index });
      },

      // Clear the currently viewing story
      clearCurrentViewingStory: () => {
        set({ currentViewingStory: null, currentStoryIndex: 0 });
      },

      // Navigate to next story
      nextStory: () => {
        const { stories, currentStoryIndex } = get();
        const cleanedStories = cleanExpiredStories(stories);
        
        if (currentStoryIndex < cleanedStories.length - 1) {
          const nextIndex = currentStoryIndex + 1;
          set({
            currentViewingStory: cleanedStories[nextIndex],
            currentStoryIndex: nextIndex,
          });
          return true;
        }
        return false;
      },

      // Navigate to previous story
      previousStory: () => {
        const { stories, currentStoryIndex } = get();
        const cleanedStories = cleanExpiredStories(stories);
        
        if (currentStoryIndex > 0) {
          const prevIndex = currentStoryIndex - 1;
          set({
            currentViewingStory: cleanedStories[prevIndex],
            currentStoryIndex: prevIndex,
          });
          return true;
        }
        return false;
      },

      // Get all non-expired stories
      getActiveStories: () => {
        const { stories } = get();
        const activeStories = cleanExpiredStories(stories);
        
        // Update the store if any stories were removed
        if (activeStories.length !== stories.length) {
          set({ stories: activeStories });
        }
        
        return activeStories;
      },

      // Clean up expired stories manually
      cleanupExpiredStories: () => {
        set((state) => ({
          stories: cleanExpiredStories(state.stories),
        }));
      },
    }),
    {
      name: 'stories-storage', // localStorage key
      partialize: (state) => ({ stories: state.stories }), // Only persist stories
    }
  )
);

