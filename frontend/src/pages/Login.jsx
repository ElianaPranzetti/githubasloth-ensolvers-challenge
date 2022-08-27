import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Button,
    Stack,
    Input,
    Heading,
    useToast,
    useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../hooks/Context";

export function LogIn(params) {
    const userContext = useContext(AppContext);
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function ToastExample(title, des, type) {
        return toast({
            title: title,
            description: des,
            status: type,
            duration: 8000,
            isClosable: true,
        });
    }

    const onSubmit = async ({ usuario, clave }) => {
        let message = await userContext.signin(usuario, clave);

        if (message != "OK") {
            ToastExample("Error.", message, "error");
        }
    };


    return (
        <Flex
            align={"center"}
            grow={1}
            justify={"center"}
            w={"100%"}
            h={"100%"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack>
                <Heading textAlign={"center"} fontSize={"4xl"}>
                    Mis Notas App
                </Heading>
                <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            rounded={"lg"}
                            bg={useColorModeValue("white", "gray.700")}
                            boxShadow={"lg"}
                            p={8}
                            width={500}
                        >
                            <Stack align={"left"}>
                                <Heading
                                    color={"purple.500"}
                                    fontSize={"2xl"}
                                    paddingBottom={4}
                                >
                                    Inicia sesión
                                </Heading>
                            </Stack>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <Input
                                        {...register("usuario", {
                                            required: {
                                                value: true,
                                                message: "Ingrese un usuario",
                                            },
                                        })}
                                    />
                                    {errors.usuario && (
                                        <div className="invalid-feedback">
                                            {errors.usuario.message}
                                        </div>
                                    )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input
                                        {...register("clave", {
                                            required: true,
                                            message: "Ingrese una contraseña",
                                        })}
                                        type="password"
                                    />
                                    {errors.clave && (
                                        <div className="invalid-feedback">
                                            {errors.clave.message}
                                        </div>
                                    )}
                                </FormControl>
                                <Stack spacing={4}>
                                    <Stack
                                        direction={{ base: "column", sm: "row" }}
                                        align={"center"}
                                        justify={"space-between"}
                                    ></Stack>
                                    <Button
                                        type="submit"
                                        bg={"purple.500"}
                                        color={"white"}
                                        _hover={{
                                            bg: "purple.300",
                                        }}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </form>
                </Stack>
            </Stack>
        </Flex>
    );
}