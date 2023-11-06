import styled from "styled-components"
import GridContainer from "./GridContainer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Container = styled.div`
flex-grow : 1;
display : flex;
flex-direction : column;
align-items : center;
`

type EventInfo = {
    id: string;
    name: string;
    timeStart: string;
    timeEnd: string;
    dateStart: string;
    dateEnd: string;
  };

const EventContainer = () => {
    const [eventInfo, setEventInfo] = useState<EventInfo>({
        id: '',
        name: '',
        timeStart: '',
        timeEnd: '',
        dateStart: '',
        dateEnd: '',
    });

    const {id} = useParams();

    useEffect(() => {
        // const currentURL = window.location.href;
        // const searchParams = new URLSearchParams(currentURL);

        // const paramNames = ['name', 'timeStart', 'timeEnd', 'dateStart', 'dateEnd']

        // const updatedEventInfo: EventInfo = { ...eventInfo };

        // paramNames.forEach(paramName => {
        //     const paramValue = searchParams.get(paramName) ?? '';
            
        //     if (paramName) {
        //         updatedEventInfo[paramName as keyof EventInfo] = paramValue;
        //     } else {
        //         console.log(paramName + ' not found in URL');
        //     }
        // })
        fetch(`http://localhost:8080/events?id=${id}`)
        .then(response => response.json())
        .then(data => {
            setEventInfo(data[0])
            console.log(data)
        })
    }, []);
    
    console.log(eventInfo)
    if (!eventInfo.name) {
        return <p>Loading...</p>;
    }

    const millSecInHour = 1000 * 60 * 60 * 24;
    // +1 since colLength starts 0
    const colLength = Math.floor((new Date(eventInfo.dateEnd).getTime() - new Date(eventInfo.dateStart).getTime()) / millSecInHour + 1);
    // *2 to split hours into 30min intervals
    const rowLength = (parseInt(eventInfo.timeEnd, 10) - parseInt(eventInfo.timeStart, 10)) * 2; 

    return(
        <Container>
            <p>{eventInfo.name}</p>
            <GridContainer 
            numCols={colLength} numRows={rowLength}
            startDate={eventInfo.dateStart} endDate={eventInfo.dateEnd} 
            startTime={eventInfo.timeStart} endTime={eventInfo.timeEnd}
            />
            <button>submit</button>
        </Container>
    )
}

export default EventContainer