import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignIn: () => void;
  handleSignOut: () => void;
}

export default function LoginForm(props: LoginFormProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box minW={"fit"} w="md">
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type={"email"}
            value={props.email}
            placeholder={"example@mail.com"}
            onChange={(e) => props.setEmail(e.target.value)}
            marginBottom={2}
          />
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder={"********"}
              onChange={(e) => props.setPassword(e.target.value)}
            />
            <InputRightElement onClick={handleClick}>
              <Button> {show ? <ViewOffIcon /> : <ViewIcon />}</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <ButtonGroup marginY={2}>
          <Button onClick={() => props.handleSignIn()}>Sign In</Button>
          <Button onClick={() => props.handleSignOut()}>Sign Out</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
}
