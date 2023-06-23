import { ReactNode, useState } from "react";
import { Dialog } from "@headlessui/react";

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title?: string | null;
  description?: string | null;
  onConfirm: () => void;
}

const ModalWrapper = ({
  children,
  onClose,
  isOpen,
  title,
  description,
  onConfirm,
}: ModalWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      onConfirm();
      onClose();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl p-4 mx-auto bg-white rounded">
          {title ? <Dialog.Title>{title}</Dialog.Title> : null}
          {description ? <Dialog.Description></Dialog.Description> : null}
          <div className="w-full">{children}</div>
          <div>
            <button
              className="p-2 m-1 border rounded hover:bg-gray-200 border-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`p-2 m-1 font-bold text-white border rounded hover:brightness-95 bg-accentOrange ${
                isLoading ? "disabled" : ""
              }`}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalWrapper;
