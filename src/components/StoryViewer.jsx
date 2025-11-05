import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { useStoriesStore } from '../store/storiesStore';
import { getTimeRemaining } from '../utils/imageUtils';
import './StoryViewer.css';

const STORY_DURATION = 5000; // 5 seconds per story

const StoryViewer = () => {
  const {
    currentViewingStory,
    currentStoryIndex,
    stories,
    clearCurrentViewingStory,
    nextStory,
    previousStory,
    markAsViewed,
    removeStory,
  } = useStoriesStore();

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeStories = stories.filter(s => {
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    return Date.now() - s.timestamp < TWENTY_FOUR_HOURS;
  });

  const handleClose = useCallback(() => {
    clearCurrentViewingStory();
    setProgress(0);
  }, [clearCurrentViewingStory]);

  const handleNext = useCallback(() => {
    const hasNext = nextStory();
    if (!hasNext) {
      handleClose();
    } else {
      setProgress(0);
    }
  }, [nextStory, handleClose]);

  const handlePrevious = useCallback(() => {
    previousStory();
    setProgress(0);
  }, [previousStory]);

  const handleDelete = useCallback(() => {
    if (currentViewingStory) {
      removeStory(currentViewingStory.id);
      const hasNext = nextStory();
      if (!hasNext) {
        handleClose();
      } else {
        setProgress(0);
      }
    }
  }, [currentViewingStory, removeStory, nextStory, handleClose]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    onSwipedDown: () => handleClose(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Progress bar animation
  useEffect(() => {
    if (!currentViewingStory || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (STORY_DURATION / 100));
        if (newProgress >= 100) {
          handleNext();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentViewingStory, isPaused, handleNext]);

  // Mark story as viewed
  useEffect(() => {
    if (currentViewingStory && !currentViewingStory.viewed) {
      markAsViewed(currentViewingStory.id);
    }
  }, [currentViewingStory, markAsViewed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentViewingStory) return;

      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'Escape':
          handleClose();
          break;
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          handleDelete();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentViewingStory, handleNext, handlePrevious, handleClose, handleDelete]);

  if (!currentViewingStory) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="story-viewer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...swipeHandlers}
      >
        {/* Progress bars */}
        <div className="story-progress-container">
          {activeStories.map((_, index) => (
            <div key={index} className="story-progress-bar">
              <motion.div
                className="story-progress-fill"
                initial={{ width: '0%' }}
                animate={{
                  width:
                    index < currentStoryIndex
                      ? '100%'
                      : index === currentStoryIndex
                      ? `${progress}%`
                      : '0%',
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="story-header">
          <div className="story-info">
            <div className="story-avatar">
              <img src={currentViewingStory.image} alt="Story" />
            </div>
            <div className="story-meta">
              <span className="story-username">Your Story</span>
              <span className="story-timestamp">
                {getTimeRemaining(currentViewingStory.timestamp)}
              </span>
            </div>
          </div>
          <div className="story-actions">
            <button
              className="story-action-btn"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? '▶' : '⏸'}
            </button>
            <button
              className="story-action-btn"
              onClick={handleDelete}
              title="Delete story"
            >
              🗑️
            </button>
            <button
              className="story-action-btn"
              onClick={handleClose}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Story content */}
        <motion.div
          className="story-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={currentViewingStory.image}
            alt="Story"
            className="story-image"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          />
        </motion.div>

        {/* Navigation areas */}
        <div className="story-nav-left" onClick={handlePrevious} />
        <div className="story-nav-right" onClick={handleNext} />

        {/* Swipe hint */}
        <div className="story-hint">
          Swipe left/right to navigate • Swipe down to close
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryViewer;

