import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { Title } from './components/Title';
import { ColorModeSwitcher } from './components/ColorSwitcher';
import { Center, Container, Flex, Grid, Box, Spacer, Button, Menu, MenuButton, MenuList, MenuItem, Stack } from '@chakra-ui/react';
import { Routes, Route } from "react-router-dom";
import { Note } from './components/Note';
import { AppContext } from "./hooks/Context";
import { LogIn } from './pages/Login';
import { LogOut } from './components/LogOut';
import { NewNote } from './components/NewNote';
import { FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';

function App() {
  const auth = useContext(AppContext);

  return (
    <>
      <Flex minH={"100vh"} w="100%" direction={"column"}>
        <Box
          w="100%"
          p={4}
          display="flex"
        >
          <ColorModeSwitcher />

          {auth.isLogged ? (
            <>
              <Spacer />
              <LogOut></LogOut>
            </>
          ) : (
            <Spacer />
          )}

        </Box>
        {auth.isLogged ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LogIn />} />
          </Routes>
        ) : (
          <LogIn></LogIn>
        )}
      </Flex>
    </>
  )
}

export default App

export function Home(params) {
  const [notes, setNotes] = useState(undefined);

  async function getNotes() {
    await fetch("http://192.168.1.23:3000/notes/archived/false", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("auth-token")
      }
    })
      .then((data) => data.json())
      .then((response) => {
        setNotes(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getArchivedNotes() {
    await fetch("http://192.168.1.23:3000/notes/archived/true", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("auth-token")
      }
    })
      .then((data) => data.json())
      .then((response) => {
        setNotes(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getAllNotes() {
    await fetch("http://192.168.1.23:3000/notes/", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("auth-token")
      }
    })
      .then((data) => data.json())
      .then((response) => {
        setNotes(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <Flex grow={1}
      direction={"column"}
      textAlign="center"
      fontSize="s"
      h={"100%"}>
      <Container maxW='100%'>
        <Title title={"Mis notas"}></Title>
      </Container>

      <Stack marginBottom={'4'} direction={['column', 'row']} spacing='24px'>
        <NewNote getAllNotes={() => getNotes()}></NewNote>
        <Spacer></Spacer>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaArrowDown />}>
            Listar
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => getArchivedNotes()}>Listar archivadas</MenuItem>
            <MenuItem onClick={() => getNotes()}>Listar sin archivar</MenuItem>
            <MenuItem onClick={() => getAllNotes()}>Listar todas</MenuItem>

          </MenuList>
        </Menu>
      </Stack>

      <Center width={'100'} >
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          {notes ? (
            notes.map((note) => {
              return <Note title={note.title} content={note.content} id={note.id} key={note.id} refreshNotes={() => getAllNotes()} ></Note>
            })
          ) :
            <h3>No se encontro ninguna nota</h3>
          }
        </Grid>
      </Center>
    </Flex >
  )
}