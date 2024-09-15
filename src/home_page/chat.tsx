import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const API_KEY = "1T3ddK5Y4PyVn7oU8aRkwcKucTeM5nzo";

interface ChatProps {
    updateId: (id: string) => void;
}

export default function Chat({ updateId }: ChatProps) {
    const [prompt, setPrompt] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const generateSong = async () => {
        try {
            const response = await axios.post('https://studio-api.suno.ai/api/generate/v2/', {
                "prompt": prompt,
                "tags" : "pop, rnb",
                "mv": "chirp-v3-5"
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            const id = response.data.clips[0].id;
            updateId(id);
        } catch (error) {
            console.error('Error generating song:', error);
        }
    };
    

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        // Adjust height based on content
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div >
            <textarea
                ref={textareaRef}
                value={prompt}
                onChange={handleTextChange}
                placeholder="Enter your notes"
                style={{
                    width: '100%',
                    overflow: 'hidden',
                    resize: 'none', 
                    borderRadius: '5px'
                }}
            />
            <Button variant="primary" onClick={generateSong}>
                Generate a Song
            </Button>
        </div>
    );
}


