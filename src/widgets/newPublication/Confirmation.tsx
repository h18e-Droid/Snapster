import { Button } from "@/shared/ui/button"

type ConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const Confirmation = ({ onConfirm, onCancel }: ConfirmationProps) => (
  <div className="confirmation-overlay">
    <div className={"modal-header-confirmation"}>
      <h2>Close</h2>
      <svg
        width="15"
        height="15"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: "100px" }}
      >
        <path
          onClick={onCancel}
          d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
          fill="white"
        />
      </svg>
    </div>
    <div className="divider"></div>
      <div className={'confirmation-text'}>
        {"Do you really want to close the\n" +
          "creation of a publication?\n" +
          "If you close everything will be\n" +
          "deleted"}
      </div>
      <div className="confirmation-buttons">
        <Button variant="outline" onClick={onCancel} style={{ marginRight: 94, marginBottom: 36, width:128, height:36 }}>Discard</Button>
        <Button variant="primary" onClick={onConfirm} style={{ marginBottom: 36 }}>Save draft</Button>
      </div>
  </div>
)