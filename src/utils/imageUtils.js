// Maximum dimensions for stories (Instagram story dimensions)
const MAX_WIDTH = 1080;
const MAX_HEIGHT = 1920;

/**
 * Resize and compress an image to fit within max dimensions
 * @param {File} file - The image file to process
 * @returns {Promise<string>} - Base64 encoded image string
 */
export const processImage = (file) => {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      reject(new Error('Image size must be less than 10MB'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        // Scale down if image is larger than max dimensions
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const widthRatio = MAX_WIDTH / width;
          const heightRatio = MAX_HEIGHT / height;
          const ratio = Math.min(widthRatio, heightRatio);

          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        resolve(base64);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Calculate time remaining until story expires
 * @param {number} timestamp - Story creation timestamp
 * @returns {string} - Formatted time remaining
 */
export const getTimeRemaining = (timestamp) => {
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  const elapsed = Date.now() - timestamp;
  const remaining = TWENTY_FOUR_HOURS - elapsed;

  if (remaining <= 0) {
    return 'Expired';
  }

  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 * @param {number} timestamp - Story creation timestamp
 * @returns {string} - Formatted relative time
 */
export const getRelativeTime = (timestamp) => {
  const elapsed = Date.now() - timestamp;
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ago`;
  }
  if (minutes > 0) {
    return `${minutes}m ago`;
  }
  return 'Just now';
};

