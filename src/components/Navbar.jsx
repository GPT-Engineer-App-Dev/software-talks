import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="gray.800" p={4}>
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" color="white" fontSize="xl" fontWeight="bold">
          Tech Forum
        </Link>
        <Flex>
          <Link as={RouterLink} to="/register" color="white" mr={4}>
            Register
          </Link>
          <Link as={RouterLink} to="/login" color="white" mr={4}>
            Login
          </Link>
          <Link as={RouterLink} to="/create-thread" color="white">
            Create Thread
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;