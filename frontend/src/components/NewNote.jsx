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
} from '@chakra-ui/react'
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { postData } from '../hooks/Context';

export function NewNote({ getAllNotes }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const toast = useToast();

    function ToastExample(title, des, type) {
        return toast({
            title: title,
            description: des,
            status: type,
            duration: 5000,
            isClosable: true,
        });
    }

    const onSubmit = async () => {
        postData("http://192.168.1.23:3000/notes", {
            title: title.value,
            content: contentNote.value,
        }, {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem('auth-token')
        }).then((data) => {
            console.log(data)
            if (!data.error) {
                ToastExample("Exito.", "Nota registrada exitosamente", "success");
                onClose();
                getAllNotes();
                reset();
            } else {
                ToastExample("Error", data.message, "error");
            }
        });
    };

    return (
        <>
            <Button onClick={onOpen}>Nueva nota</Button>
            <form >
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
                            <FormControl isRequired>
                                <FormLabel>Titulo</FormLabel>
                                <Input  {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Ingrese un titulo",
                                    },
                                })} ref={initialRef} placeholder='Titulo' name='title' id='title' />
                                {errors.usuario && (
                                    <div className="invalid-feedback">
                                        {errors.usuario.message}
                                    </div>
                                )}
                            </FormControl>

                            <FormControl mt={4} isRequired>
                                <FormLabel>Contenido</FormLabel>
                                <Textarea
                                    {...register("contentNote", {
                                        required: true,

                                    })}
                                    placeholder='En que estas pensando?' name='contentNote' id='contentNote' />
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
            </form>
        </>
    )
}