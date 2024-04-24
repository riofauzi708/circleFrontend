import { Modal } from "@chakra-ui/react"

export interface IModalDialogProps {
    children: React.ReactElement
    show: boolean
    callBack: () => void
}

const ChakraModalDialog: React.FC<IModalDialogProps> = ({ 
    children, show, callBack }) => {
  return (
    <Modal
        isOpen={show}
        onClose={callBack}
        motionPreset="slideInBottom"
    >
        {children}
    </Modal>
  )
}

export default ChakraModalDialog