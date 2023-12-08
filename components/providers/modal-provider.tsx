import React from "react";
import FolderModal from "../modals/folder-modal";
import PlanModal from "../modals/plan-modal";

const ModalProvider = () => {
  return (
    <div className="fixed">
      <FolderModal />
      <PlanModal />
    </div>
  );
};

export default ModalProvider;
