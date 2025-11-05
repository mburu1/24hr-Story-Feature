import { motion } from 'framer-motion';
import { getRelativeTime } from '../utils/imageUtils';
import './StoryCircle.css';

const StoryCircle = ({ story, onClick, isViewed }) => {
  return (
    <motion.div
      className="story-circle-container"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`story-circle ${isViewed ? 'viewed' : 'unviewed'}`}>
        <div className="story-image-wrapper">
          <img
            src={story.image}
            alt="Story"
            className="story-thumbnail"
          />
        </div>
      </div>
      <span className="story-time">{getRelativeTime(story.timestamp)}</span>
    </motion.div>
  );
};

export default StoryCircle;

