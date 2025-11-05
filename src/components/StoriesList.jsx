import { useEffect } from 'react';
import { useStoriesStore } from '../store/storiesStore';
import StoryCircle from './StoryCircle';
import AddStory from './AddStory';
import './StoriesList.css';

const StoriesList = () => {
  const {
    stories,
    setCurrentViewingStory,
    cleanupExpiredStories,
  } = useStoriesStore();

  // Clean up expired stories on mount and periodically
  useEffect(() => {
    cleanupExpiredStories();

    // Check for expired stories every minute
    const interval = setInterval(() => {
      cleanupExpiredStories();
    }, 60000);

    return () => clearInterval(interval);
  }, [cleanupExpiredStories]);

  // Filter out expired stories
  const activeStories = stories.filter(story => {
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    return Date.now() - story.timestamp < TWENTY_FOUR_HOURS;
  });

  const handleStoryClick = (story, index) => {
    setCurrentViewingStory(story, index);
  };

  return (
    <div className="stories-list-container">
      <div className="stories-list">
        <AddStory />
        
        {activeStories.map((story, index) => (
          <StoryCircle
            key={story.id}
            story={story}
            onClick={() => handleStoryClick(story, index)}
            isViewed={story.viewed}
          />
        ))}

        {activeStories.length === 0 && (
          <div className="no-stories-message">
            <p>No stories yet</p>
            <span>Click the + button to add your first story!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesList;

