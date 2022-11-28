import React, { useState } from "react";
import "./App.css";
import { Box, Center, Flex, Spacer, useToast } from "@chakra-ui/react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TokenForm from "./components/TokenForm";
import axios from "axios";

function App() {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerConfirmPassword, setRegisterConfirmPassword] =
    useState<string>("");
  const [token, setToken] = useState<string>("");
  const toast = useToast();
  enum Status {
    success = "success",
    error = "error",
  }

  const handleShowToast = (
    title: string,
    status: Status,
    description?: string
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: true,
    });
  };

  const handleSignIn = (
    email: string = loginEmail,
    password: string = loginPassword
  ) => {
    axios
      .post(
        "https://localhost:7077/api/auth/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setToken(res.data.accessToken);
        handleShowToast("Success", Status.success, "Signed in successfully");
      })
      .catch((err) => {
        console.log(err);
        handleShowToast("Sign In Error", Status.error, err.message);
      });
  };

  const handleSignUp = () => {
    if (registerPassword !== registerConfirmPassword) {
      handleShowToast("Sign Up Error", Status.error, "Passwords do not match");
      return;
    }
    axios
      .post(
        "https://localhost:7077/api/users",
        {
          email: registerEmail,
          password: registerPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        handleShowToast("Success", Status.success, "Signed up successfully");
        handleSignIn(registerEmail, registerPassword);
      })
      .catch((err) => {
        console.log(err);
        handleShowToast("Sign Up Error", Status.error, err.message);
      });
  };

  const handleSignOut = () => {
    window.location.reload();
  };

  const handleGenerateToken = () => {
    if (loginEmail && loginPassword) {
      handleSignIn(loginEmail, loginPassword);
    } else if (registerEmail && registerPassword) {
      handleSignIn(registerEmail, registerPassword);
    } else {
      handleShowToast(
        "Generate Token Error",
        Status.error,
        "Please fill sign in or sign up form"
      );
    }
  };

  return (
    <div className="">
      <header className=""></header>
      <body>
        <Center>
          <Flex
            border={"1px"}
            borderRadius="xl"
            shadow={"xl"}
            w={"80%"}
            gap="6"
            p={4}
            m={4}
            wrap={"wrap"}
          >
            <LoginForm
              email={loginEmail}
              setEmail={setLoginEmail}
              password={loginPassword}
              setPassword={setLoginPassword}
              handleSignIn={handleSignIn}
              handleSignOut={handleSignOut}
            />
            <Spacer />
            <RegisterForm
              email={registerEmail}
              setEmail={setRegisterEmail}
              password={registerPassword}
              setPassword={setRegisterPassword}
              confirmPassword={registerConfirmPassword}
              setConfirmPassword={setRegisterConfirmPassword}
              handleSignUp={handleSignUp}
            />
            <Spacer />
            <TokenForm
              handleGenerateToken={handleGenerateToken}
              token={token}
            />
          </Flex>
        </Center>
      </body>
      <footer></footer>
    </div>
  );
}

export default App;
