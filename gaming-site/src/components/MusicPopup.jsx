import { FiMusic, FiXCircle } from 'react-icons/fi';

const MusicPopup = ({ isOpen, onClose, onToggleMusic }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiMusic className="text-blue-500" />
            Music Preferences
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiXCircle size={24} />
          </button>
        </div>
        <p className="mt-4 text-gray-600">
          Would you like to enable or disable the background music for an enhanced experience?
        </p>
        <div className="mt-6 flex justify-between gap-4">
          <button
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition-all duration-200"
            onClick={() => {
              onToggleMusic(true);
              onClose();
            }}
          >
            Enable Music 🎵
          </button>
          <button
            className="w-full rounded-md bg-gray-300 px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-400 transition-all duration-200"
            onClick={() => {
              onToggleMusic(false);
              onClose();
            }}
          >
            Disable Music ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPopup;
