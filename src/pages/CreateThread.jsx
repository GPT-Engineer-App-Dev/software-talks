import { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Text } from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const CreateThread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleCreateThread = async () => {
    try {
      await addDoc(collection(db, "threads"), {
        title,
        content,
        createdAt: new Date(),
      });
      setError("");
      // Redirect to thread list or thread detail page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Create New Thread</Text>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={handleCreateThread}>Create Thread</Button>
      </VStack>
    </Box>
  );
};

export default CreateThread;