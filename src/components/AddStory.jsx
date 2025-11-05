import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoriesStore } from '../store/storiesStore';
import { processImage } from '../utils/imageUtils';
import './AddStory.css';

const AddStory = () => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const addStory = useStoriesStore((state) => state.addStory);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const base64Image = await processImage(file);
      addStory(base64Image);
      
      // Reset input
      e.target.value = '';
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-story-container">
      <motion.div
        className="add-story-circle"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="add-story-button">
          {isUploading ? (
            <div className="spinner"></div>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          )}
        </div>
      </motion.div>
      <span className="add-story-label">Add Story</span>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <AnimatePresence>
        {error && (
          <motion.div
            className="error-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddStory;

