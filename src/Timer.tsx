import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Toast, ToastContainer, Container, Row, Col } from 'react-bootstrap';
import { Play, Pause, X } from 'react-bootstrap-icons';

export default function Timer() {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // Default to 0 seconds
    const [inputValue, setInputValue] = useState('0'); // For user input
    const [timer, setTimer] = useState('');
    const [showToast, setShowToast] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            (hrs > 9 ? hrs : "0" + hrs),
            (mins > 9 ? mins : "0" + mins),
            (secs > 9 ? secs : "0" + secs)
        ].join(":");
    };

    const updateTimer = () => {
        setTimeLeft(prev => {
            if (prev <= 0) {
                clearInterval(intervalRef.current!);
                setShowToast(true);
                return 0;
            }
            return prev - 1;
        });
    };

    const startTimer = () => {
        if (!isRunning && timeLeft > 0) {
            setIsRunning(true);
            intervalRef.current = setInterval(updateTimer, 1000);
        }
    };

    const stopTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current!);
        }
    };

    const resetTimer = () => {
        stopTimer();
        setTimeLeft(Number(inputValue));
        setTimer(formatTime(Number(inputValue)));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        setTimer(formatTime(timeLeft));
    }, [timeLeft]);

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="number"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder='Enter time in seconds'
                                disabled={isRunning}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="light" onClick={isRunning ? stopTimer : startTimer}>
                                    {isRunning ? <Pause /> : <Play />}
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="light" onClick={resetTimer}>
                                    <X />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <ToastContainer>
                {showToast && (
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Timer</strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body>Your timer has finished.</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>
        </Container>
    );
}


            




