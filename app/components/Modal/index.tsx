import classes from "./index.module.css";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, className, ...props }) => {
  return (
    <div
      {...props}
      className={[className, classes.modal].filter(Boolean).join(" ")}
      aria-hidden={!show}
    >
      {props.children}
    </div>
  );
};
export default Modal;
