import { useContext } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Title } from './components/Title'
import { ColorModeSwitcher } from './components/ColorSwitcher';
import { Center, Container, Flex, Grid } from '@chakra-ui/react';
import { Routes, Route } from "react-router-dom";
import { Note } from './components/Note';
import { AppContext } from "./hooks/Context";
import { LogIn } from './pages/Login';

function App() {
  const auth = useContext(AppContext);

  return (
    <>
      {auth.isLogged ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LogIn />} />
        </Routes>
      ) : (
        <LogIn></LogIn>
      )}
    </>
  )
}

export default App

function Home(params) {
  return (
    <Flex grow={1}
      direction={"column"}
      textAlign="center"
      fontSize="s"
      h={"100%"}>
      <Container maxW='100%'>
        <ColorModeSwitcher />
        <Title title={"Mis notas"}></Title>
      </Container>

      <Center width={'100'} >
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          <Note title={'mi nueva nota'} content={'soy un contenido muy askdhakdalj askdjsakd dalskdjsalkd'}></Note>
          <Note title={'mi nueva nota'} content={'soy un contenido muy askdhakdalj askdjsakd dalskdjsalkd'}></Note>
          <Note title={'mi nueva nota'} content={'soy un contenido muy askdhakdalj askdjsakd dalskdjsalkd'}></Note>
          <Note title={'mi nueva nota'} content={'soy un contenido muy askdhakdalj askdjsakd dalskdjsalkd'}></Note>
          <Note title={'mi nueva nota'} content={'soy un contenido muy askdhakdalj askdjsakd dalskdjsalkd'}></Note>
        </Grid>
      </Center>
    </Flex>
  )
}