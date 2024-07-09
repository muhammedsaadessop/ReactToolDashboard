import { useEffect, useState } from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Container, Center, Highlight, Mark, Input, Textarea, VStack, theme, extendTheme, Alert, AlertIcon } from '@chakra-ui/react';

const customTheme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "#f0f4f8",
                color: "gray.800",
            },
        },
    },
});

export const App = () => {
    const storageKeyName = "count";
    const notesStorageKey = "notes";

    const retrieveCountValue = () => Number(localStorage.getItem(storageKeyName) || 0);
    const retrieveNotes = () => JSON.parse(localStorage.getItem(notesStorageKey) || '[]');

    const [count, setCount] = useState(retrieveCountValue());
    const [notes, setNotes] = useState(retrieveNotes());
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [warning, setWarning] = useState('');

    const addNumber = (count) => setCount(Number(count) + 1);
    const subtractNumber = (count) => setCount(Number(count) - 1);

    useEffect(() => {
        localStorage.setItem(storageKeyName, String(count));
    }, [count]);

    useEffect(() => {
        localStorage.setItem(notesStorageKey, JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!title) {
            setWarning('Title can\'t be left blank.');
            return;
        }
        if (!body) {
            setWarning('Body can\'t be left blank.');
            return;
        }
        setNotes([{ title, body }, ...notes]);
        setTitle('');
        setBody('');
        setWarning('');
    };

    const clearNotes = () => {
        setNotes([]);
    };

    const closeApp = () => {
        if (window.confirm("Are you sure you want to close the app?")) {
            window.close();
        }
    };

    const downloadNotes = () => {
        const noteText = notes.map(note => `Title: ${note.title}\nBody: ${note.body}\n\n`).join('');
        const blob = new Blob([noteText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <ChakraProvider theme={customTheme}>
            <Box bg="gray.100" minH="100vh" py={10}>
                <Container maxW="container.lg" bg="white" p={6} borderRadius="md" shadow="md">
                    <Center mb={4}>
                        <Heading lineHeight='tall'>
                            <Highlight
                                query='stranger'
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
                            >
                                Welcome Stranger 🎉
                            </Highlight>
                        </Heading>
                    </Center>

                    <Center mb={4}>
                        <Text fontSize='md' fontStyle="italic">This is my beautiful React webapp!</Text>
                    </Center>

                    <Center m={4}>
                        <Mark bg='black' color='white' fontFamily='NewYork' fontSize='lg' fontWeight="bold" p='1'>
                            Count is Already {count}!
                        </Mark>
                    </Center>

                    <Center mb={4}>
                        <Button
                            size='md'
                            height='48px'
                            width='200px'
                            border='2px'
                            variant='solid'
                            fontStyle='italic'
                            onClick={() => addNumber(count)}
                        >
                            Count Me!
                        </Button>
                    </Center>

                    <Center mb={4}>
                        <Button
                            size='md'
                            height='48px'
                            width='200px'
                            border='2px'
                            variant='solid'
                            fontStyle='italic'
                            onClick={() => subtractNumber(count)}
                        >
                            Count Me Out!
                        </Button>
                    </Center>

                    <Center mb={4}>
                        <Button
                            size='md'
                            height='48px'
                            width='200px'
                            border='2px'
                            variant='solid'
                            fontStyle='italic'
                            onClick={closeApp}
                        >
                            Close App
                        </Button>
                    </Center>

                    <Center mb={4}>
                        <Button
                            size='md'
                            height='48px'
                            width='200px'
                            border='2px'
                            variant='solid'
                            fontStyle='italic'
                            onClick={clearNotes}
                        >
                            Clear Notes
                        </Button>
                    </Center>

                    <VStack mt={8} spacing={4} align="stretch">
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Textarea
                            placeholder="Body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <Center>
                            <Button
                                size='md'
                                height='48px'
                                width='200px'
                                border='2px'
                                variant='solid'
                                fontStyle='italic'
                                onClick={addNote}
                                mr={2}
                            >
                                Submit Note
                            </Button>
                            <Button
                                size='md'
                                height='48px'
                                width='200px'
                                border='2px'
                                variant='solid'
                                fontStyle='italic'
                                onClick={downloadNotes}
                            >
                                Download Notes
                            </Button>
                        </Center>
                    </VStack>

                    {warning && (
                        <Alert status="warning" mt={4}>
                            <AlertIcon />
                            {warning}
                        </Alert>
                    )}

                    <VStack mt={8} spacing={4} align="stretch">
                        {notes.map((note, index) => (
                            <Box key={index} p={4} borderWidth="1px" borderRadius="md" shadow="md">
                                <Heading size="md">{note.title}</Heading>
                                <Text mt={2}>{note.body}</Text>
                            </Box>
                        ))}
                    </VStack>
                </Container>
            </Box>
        </ChakraProvider>
    );
};
