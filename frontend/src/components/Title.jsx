import { Heading, Container, Text, Button } from "@chakra-ui/react";

export function Title({ title }) {
    return (
        <>
            <Container maxW={"3xl"} padding={"5"}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                >
                    <Text as={"span"} color={"purple.400"}>
                        {title}
                    </Text>
                </Heading>
            </Container>
        </>
    )
}