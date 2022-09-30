import {
    useDisclosure,
    Button,
    useToast,
} from '@chakra-ui/react';
import React from "react";
import { useForm } from "react-hook-form";
import { postData } from '../hooks/Context';
import { domain } from '../utils';
import { NoteForm } from './NoteForm';

export function NewNote({ getAllNotes }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
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

    const onSubmit = () => {
        postData("POST", `${domain}/notes`, {
            title: titleNote.value,
            content: contentNote.value,
        }, {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem('auth-token')
        }).then((data) => {

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
            <NoteForm finalRef={finalRef} initialRef={initialRef} isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} ></NoteForm>
        </>
    )
}