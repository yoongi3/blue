import Header from "../components/Header"
import NavBar from "../components/NavBar"
import styled from "styled-components"
import NewEventContainer from "../components/EventContainer/NewEventContainer"

const Container = styled.div`
display : flex;
justify-content : center;
background-color: #98C1D9;
`

function HomePage() {
    return (
        <>
            <Header/>
            <Container>
                <NewEventContainer/>
                <NavBar/>
            </Container>
        </> 
    )
}

export default HomePage