import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleSignUp: () => void;
}

export default function RegisterForm(props: RegisterFormProps) {
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
          <InputGroup marginBottom={2}>
            <Input
              type={show ? "text" : "password"}
              placeholder={"********"}
              onChange={(e) => props.setPassword(e.target.value)}
            />
            <InputRightElement onClick={handleClick}>
              <Button> {show ? <ViewOffIcon /> : <ViewIcon />}</Button>
            </InputRightElement>
          </InputGroup>

          <FormLabel>Confirm password</FormLabel>
          <InputGroup>
            <Input
              type={"password"}
              placeholder={"********"}
              onChange={(e) => props.setConfirmPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Button marginY={2} onClick={() => props.handleSignUp()}>
          Register
        </Button>
      </form>
    </Box>
  );
}
