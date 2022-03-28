import {
  FC,
  ReactElement,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { EventEmitter } from "events";
import styles from "./styles.module.css";
import { makeid } from "../../helpers/make.id";

const modelEmitter = new EventEmitter();

interface ModalInterface {
  uniqueId: string;
  title: string | ReactElement;
  minWidth?: any;
  maxWidth?: any;
  component: ReactElement;
  close: () => void;
  disabledClosing?: boolean;
  passRef: RefObject<any>;
}

interface ModalInterfaceAdd {
  title: string | ReactElement;
  disabledClosing?: boolean;
  minWidth?: any;
  maxWidth?: any;
  component: (close: () => void, ref: RefObject<any>) => ReactElement;
}

export const Modal: FC<ModalInterface> = (props) => {
  return (
    <div
      className={styles.background}
      onClick={props.disabledClosing ? () => {} : props.close}
    >
      <div
        ref={props.passRef}
        className={styles.modal}
        style={{ minWidth: props.minWidth, maxWidth: props.maxWidth }}
        onClick={($event) => $event.stopPropagation()}
      >
        {!props.disabledClosing && (
          <div className={styles.close} onClick={props.close}>
            X
          </div>
        )}
        <div style={{ position: "relative", flex: 1, paddingBottom: 80 }}>
          <h2>{props.title}</h2>
          {props.component}
        </div>
      </div>
    </div>
  );
};

export const showModal = (params: ModalInterfaceAdd) => {
  modelEmitter.emit("add", params);
};

let allModal = [] as ModalInterface[];

export function ModalList() {
  const [modals, setModals] = useState<ModalInterface[]>([]);
  const modalRef = useRef(null);

  const remove = (uniqueId: string) => () => {
    allModal = allModal.filter((f) => f.uniqueId !== uniqueId);
    setModals(allModal);
  };

  const triggerAdd = (data: ModalInterfaceAdd) => {
    allModal = [
      ...allModal,
      {
        ...data,
        uniqueId: makeid(5),
        passRef: modalRef,
        get close() {
          return remove(this.uniqueId);
        },
        get component() {
          return data.component(remove(this.uniqueId), modalRef);
        },
      },
    ];

    setModals(allModal);
  };

  useEffect(() => {
    // @ts-ignore
    modelEmitter.on("add", triggerAdd);
  }, []);

  return (
    <>
      {modals.map((modal) => (
        <Modal key={modal.uniqueId} {...modal} />
      ))}
    </>
  );
}
