import { GridItem, Heading, Button, Text, useToast, } from "@chakra-ui/react";
import { postData } from '../hooks/Context';

export function Note({ id, title, content, refreshNotes }) {
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

    const onSubmit = async (noteId) => {
        postData("DELETE", "http://192.168.1.23:3000/notes/" + noteId, {}, {
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

    return (
        <GridItem w='100%' h='120' bg='yellow.100' >
            <Heading paddingTop={'4'} as='h4' size='md' color={'black'}>{title}</Heading>

            <GridItem area={'footer'}  >
                <Button margin={'4'} colorScheme='green'>Editar</Button>
                <Button margin={'4'} colorScheme='blue'>Archivar</Button>
                <Button onClick={() => onSubmit(id)} margin={'4'} colorScheme='red'>Eliminar</Button>
            </GridItem>
        </GridItem >
    );

}