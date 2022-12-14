import { GridItem, Heading, Button, Text, useToast, useDisclosure, Textarea } from "@chakra-ui/react";
import { FaArrowCircleUp, FaTrash } from "react-icons/fa";
import { postData } from '../hooks/Context';
import React, { useRef } from "react";
import { NoteForm } from './NoteForm';
import { domain } from "../utils";

export function Note({ id, title, content, isArchived, refreshNotes }) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    function ToastExample(title, des, type) {
        return toast({
            title: title,
            description: des,
            status: type,
            duration: 5000,
            isClosable: true,
        });
    }

    const deleteNote = async (noteId) => {
        postData("DELETE", `${domain}/notes/` + noteId, {}, {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem('auth-token')
        }).then((data) => {
            if (!data.error) {
                ToastExample("Exito.", "Nota eliminada exitosamente", "success");
                refreshNotes();
            } else {
                ToastExample("Error", data.message, "error");
            }
        });
    };

    const archive = (noteId) => {

        let body;

        if (isArchived) {
            body = {
                title: title,
                content: content,
            }
        } else {
            body = {
                title: title,
                content: content,
                state: true,
            }
        }

        postData("PATCH", `${domain}/notes/` + noteId, body, {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem('auth-token'),
        }).then((data) => {
            if (!data.error) {
                ToastExample("Exito.", "Nota actualizada exitosamente", "success");
                refreshNotes();
            } else {
                ToastExample("Error", data.message, "error");
            }
        });
    }

    const onSubmit = () => {
        let body;

        if (isArchived) {
            body = {
                id: id,
                title: titleNote.value,
                content: contentNote.value,
                state: true,
            }

        } else {
            body = {
                id: id,
                title: titleNote.value,
                content: contentNote.value,
            }
        }

        postData("PATCH", `${domain}/notes/` + id, body, {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem('auth-token')
        }).then((data) => {
            if (!data.error) {
                ToastExample("Exito.", "Nota actualizada exitosamente", "success");
                onClose();
                refreshNotes();
            } else {
                ToastExample("Error", data.message, "error");
            }
        });
    }

    return (
        <GridItem w='100%' bg='yellow.100' >
            <Heading paddingTop={'4'} as='h4' size='md' color={'black'}>{title}</Heading>
            <Textarea isReadOnly color={'black'} value={content} />

            <GridItem area={'footer'}  >
                <Button onClick={onOpen} margin={'4'} colorScheme='green'>Editar</Button>

                <NoteForm finalRef={finalRef} initialRef={initialRef} isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} title={title} content={content} id={id}></NoteForm>

                <Button width={'100px'} onClick={() => archive(id)} margin={'4'} colorScheme='blue'>{(isArchived ? "Desarchivar" : "Archivar")}</Button>
                <Button onClick={() => deleteNote(id)} margin={'4'} colorScheme='red'> <FaTrash></FaTrash> </Button>
            </GridItem>
        </GridItem >
    );

}