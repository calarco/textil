import { useState, useEffect } from "react";
import styled from "styled-components";

import Dia from "./Dia";

const Container = styled.main`
    overflow: auto;
`;

const Month = styled.ul`
    display: grid;
`;

const Mes = styled.div`
    position: sticky;
    top: 0;
    z-index: 900;
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    background: var(--surface-t);
    backdrop-filter: blur(0.4rem);
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: 5rem 1fr;
    align-items: center;
    text-transform: capitalize;

    h6 {
        color: var(--on-background-variant);
    }
`;

const Day = styled.li`
    padding: 0.5rem 1.5rem;
    display: grid;
    grid-template-columns: 5rem 1fr;
    gap: 1rem;
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    text-align: right;
`;

function Calendar() {
    const [calendar, setCalendar] = useState([
        { year: 0, month: 0, days: [0] },
    ]);

    useEffect(() => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const days: number[] = [];
        for (var i = 1; i <= 32 - new Date(year, month, 32).getDate(); i++) {
            days.push(i);
        }
        setCalendar([{ year: year, month: month, days: days }]);
    }, []);

    return (
        <Container>
            {calendar.map((item) => (
                <Month key={item.month}>
                    <Mes>
                        <h4>{item.year}</h4>
                        <Columns>
                            <p>$2.664.357,15</p>
                            <p>$2.559.243,82</p>
                            <p>-$105.113,33</p>
                        </Columns>
                    </Mes>
                    <Mes>
                        <h4>
                            {new Date(
                                item.year,
                                item.month,
                                1
                            ).toLocaleDateString("default", {
                                month: "long",
                            })}
                        </h4>
                        <Columns>
                            <p>$2.664.357,15</p>
                            <p>$2.559.243,82</p>
                            <p>-$105.113,33</p>
                        </Columns>
                    </Mes>
                    {item.days.map((number) => (
                        <Day key={number}>
                            <Dia date={[item.year, item.month, number]} />
                            <Columns>
                                <p>$2.664.357,15</p>
                                <p>$2.559.243,82</p>
                                <p>-$105.113,33</p>
                            </Columns>
                        </Day>
                    ))}
                </Month>
            ))}
        </Container>
    );
}

export default Calendar;
