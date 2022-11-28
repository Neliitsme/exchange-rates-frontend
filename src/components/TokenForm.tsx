import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

export interface TokenFormProps {
  handleGenerateToken: () => void;
  token: string;
}

export default function TokenForm(props: TokenFormProps) {
  return (
    <Box minW={"fit"} w="md">
      <FormControl>
        <FormLabel>Token</FormLabel>
        <Input
          type={"text"}
          value={props.token}
          onChange={(e) => e.preventDefault()}
        />
      </FormControl>
      <Button marginY={2} onClick={() => props.handleGenerateToken()}>
        Generate
      </Button>
    </Box>
  );
}
