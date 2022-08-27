import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Textarea,
    FormControl,
    useToast,
    FormLabel,
    Input,
} from '@chakra-ui/react';

export function NoteForm({ initialRef, isOpen, finalRef, onClose, onSubmit, title, content, id }) {
    let noteTitle, noteContent;
    if (id) {

        noteTitle = title
        noteContent = content
    }
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                finalFocusRef={finalRef}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear nueva nota</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input type={"hidden"} value={id} ></Input>
                        <FormControl isRequired>
                            <FormLabel>Titulo</FormLabel>
                            <Input ref={initialRef} placeholder='Titulo' name='title' id='titleNote' defaultValue={noteTitle} />

                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel>Contenido</FormLabel>
                            <Textarea
                                placeholder='En que estas pensando?' name='contentNote' id='contentNote' defaultValue={noteContent} />

                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onSubmit} colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
} 