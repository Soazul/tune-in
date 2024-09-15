import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Image, Container, Button } from 'react-bootstrap';
import { Play, Pause, Heart, HeartFill, Repeat, Repeat1 } from 'react-bootstrap-icons';

const API_KEY = "1T3ddK5Y4PyVn7oU8aRkwcKucTeM5nzo";

interface LyricsProps {
    clipId: string;
}

export default function SongPlayer({ clipId }: LyricsProps) {
    const [image, setImage] = useState<string>('');
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likedSongs, setLikedSongs] = useState<string[]>([]);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [isPolling, setIsPolling] = useState<boolean>(true);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLooping, setIsLooping] = useState<boolean>(false)

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const fetchClipDetails = async () => {
            try {
                const response = await axios.get(`https://studio-api.suno.ai/api/feed/v2/?ids=${clipId}`, {
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                const clip = response.data.clips[0];
                setImage(clip.image_url);
                setAudioUrl(clip.audio_url);
                setIsLiked(clip.is_liked);
                if (clip.audio_url) {
                    setIsPolling(false);
                }
            } catch (error) {
                console.error(error);
            }
        };
        
        const pollForAudioUrl = () => {
            if (isPolling) {
                fetchClipDetails();
            }
        };
    
        const intervalId = setInterval(pollForAudioUrl, 5000);
    
        return () => {
            clearInterval(intervalId);
        };
    }, [clipId, isPolling]);
    

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleLoop = () => {
        if (audioRef.current) {
            audioRef.current.loop = !isLooping;  // Set the loop attribute of the audio element
        }
        setIsLooping(!isLooping);  // Update the loop state
    };

    const toggleIsLiked = () => {
        setIsLiked(!isLiked);
        setLikedSongs((prevFavorites) => {
            // Add the current song ID to the favoriteSongs list if it's not already in the list
            if (!prevFavorites.includes(clipId)) {
                return [...prevFavorites, clipId];
            }
            console.log(prevFavorites)
            return prevFavorites;
        });
    }
    
    return (
        
        <Container>
            <div style={{backgroundColor:'beige', width: '50%'}}>
            {image && <Image src={image} alt="cover image" width={70} height={70} thumbnail />}
            {audioUrl ? (
                <>
                    <audio ref={audioRef} src={audioUrl} hidden />
                        <Button variant="light" onClick={togglePlayPause} style={{margin: '5px'}}>
                        {isPlaying ? <Pause style={{ fontSize: '24px' }} /> : <Play style={{ fontSize: '24px' }} />}
                        </Button>
                        <Button variant='light' onClick={toggleLoop} style={{margin: '5px'}}>
                            {isLooping ? <Repeat1 style={{ fontSize: '20px' }}/> : <Repeat style={{ fontSize: '20px' }}/>}
                        </Button>
                        <Button variant="light" onClick={toggleIsLiked} style={{margin: '5px'}}>
                            {isLiked ? <HeartFill style={{ fontSize: '20px' }}/> : <Heart style={{ fontSize: '20px' }}/>}
                        </Button>
                </>
            ) : (
                <p>Loading audio...</p>
            )}
        </div>
        </Container>

    );
}
