import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }: { onClose: () => void; children: React.ReactNode; title: string }) => {
    const handleCloseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );

    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        return null; // Or a fallback UI
    }

    return ReactDOM.createPortal(
        modalContent,
        modalRoot
    );
};

export default Modal