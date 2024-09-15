import React, { useState } from 'react';
import Chat from "./chat";
import { Container, Row, Col } from "react-bootstrap";
import SongPlayer from './song_player';

export default function LandingPage () {
    const [clipId, setClipId] = useState<string | null>(null);

    const handleClipIdChange = (id: string) => {
        setClipId(id);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Chat updateId={handleClipIdChange} />
                </Col>
                    
            </Row>
            {clipId && <SongPlayer clipId={clipId} />}
        </Container>
    );
}