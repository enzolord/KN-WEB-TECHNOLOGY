import { FaXmark } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ open, title, onClose, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="admin-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="admin-modal"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="admin-modal-head">
              <h3>{title}</h3>
              <button className="admin-modal-close" onClick={onClose} aria-label="Fermer">
                <FaXmark size={16} />
              </button>
            </div>
            {children}
            {footer && <div className="admin-modal-foot">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
