import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { Play, Pause, X } from 'react-bootstrap-icons';

export default function Timer() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const id = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(id);
                        setShowToast(true);
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setIntervalId(id);
        } else if (!isRunning && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isRunning, timeLeft, intervalId]);

    const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHours(parseInt(e.target.value) || 0);
    };

    const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMinutes(parseInt(e.target.value) || 0);
    };

    const startTimer = () => {
        setTimeLeft(hours * 3600 + minutes * 60);
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const restartTimer = () => {
        setHours(0);
        setMinutes(0);
        setTimeLeft(0);
        setIsRunning(false);
        setShowToast(false); // Hide the toast when restarting
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    return (
        <div className="timer-container">
            <div className="timer-display">
                {formatTime(timeLeft)}
            </div>
            <Form>
                <Form.Group controlId="hours">
                    <Form.Label>Hours</Form.Label>
                    <Form.Control
                        type="number"
                        value={hours}
                        onChange={handleHoursChange}
                        min="0"
                        disabled={isRunning}
                    />
                </Form.Group>
                <Form.Group controlId="minutes">
                    <Form.Label>Minutes</Form.Label>
                    <Form.Control
                        type="number"
                        value={minutes}
                        onChange={handleMinutesChange}
                        min="0"
                        disabled={isRunning}
                    />
                </Form.Group>
                <Button variant="primary" onClick={startTimer} disabled={isRunning}><Play/></Button>
                <Button variant="secondary" onClick={pauseTimer} disabled={!isRunning}><Pause/></Button>
                <Button variant="danger" onClick={restartTimer}><X/></Button>
            </Form>
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
        </div>
    );
}



