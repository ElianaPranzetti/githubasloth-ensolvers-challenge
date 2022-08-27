import { GridItem, Heading, Button, Text } from "@chakra-ui/react"

export function Note({ id, title, content }) {
    return (
        <GridItem w='100%' h='120' bg='yellow.100' >
            <Heading paddingTop={'4'} as='h4' size='md' color={'black'}>{title}</Heading>

            <GridItem area={'footer'}  >
                <Button margin={'4'} colorScheme='green'>Editar</Button>
                <Button margin={'4'} colorScheme='yellow'>Archivar</Button>
                <Button margin={'4'} colorScheme='red'>Eliminar</Button>
            </GridItem>
        </GridItem >
    );

}