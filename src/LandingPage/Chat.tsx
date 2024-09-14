// file for the chat and lyrics feature
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function Chat() {
    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Control type="text" placeholder="Enter a concept" />
                    </Form>
                </Col>
                <Col>
                
                </Col>
                </Row>
        </Container>
    );
}
