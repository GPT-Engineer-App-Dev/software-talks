import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Input, VStack, Text, Textarea } from "@chakra-ui/react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Thread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThread = async () => {
      const threadDoc = await getDocs(query(collection(db, "threads"), where("id", "==", id)));
      setThread(threadDoc.docs[0].data());
    };

    const fetchComments = async () => {
      const commentsQuery = query(collection(db, "comments"), where("threadId", "==", id));
      const commentsSnapshot = await getDocs(commentsQuery);
      setComments(commentsSnapshot.docs.map(doc => doc.data()));
    };

    fetchThread();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    try {
      await addDoc(collection(db, "comments"), {
        threadId: id,
        content: newComment,
        createdAt: new Date(),
      });
      setError("");
      setNewComment("");
      // Refresh comments
      const commentsQuery = query(collection(db, "comments"), where("threadId", "==", id));
      const commentsSnapshot = await getDocs(commentsQuery);
      setComments(commentsSnapshot.docs.map(doc => doc.data()));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={4}>
      {thread && (
        <VStack spacing={4}>
          <Text fontSize="2xl">{thread.title}</Text>
          <Text>{thread.content}</Text>
          <Textarea placeholder="Add a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          {error && <Text color="red.500">{error}</Text>}
          <Button onClick={handleAddComment}>Add Comment</Button>
          <VStack spacing={2} align="start">
            {comments.map((comment, index) => (
              <Box key={index} p={2} borderWidth="1px" borderRadius="md">
                <Text>{comment.content}</Text>
              </Box>
            ))}
          </VStack>
        </VStack>
      )}
    </Box>
  );
};

export default Thread;