import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box borderRadius={10} overflow="hidden" width="100%" height="100%">
      {children}
    </Box>
  );
};

export default GameCardContainer;
