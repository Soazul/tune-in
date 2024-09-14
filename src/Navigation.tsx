import Nav from 'react-bootstrap/Nav';

export default function Navigation() {
    return(
        <Nav defaultActiveKey={"/"} className={"flex-column"
        }>
            <Nav.Link href="/music">Study Music</Nav.Link>
            <Nav.Link href="/room">Host Group Study Room</Nav.Link>
            <Nav.Link href="/library">Song Library</Nav.Link>
        </Nav>

    )
}
