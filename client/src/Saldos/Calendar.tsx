import { useState } from "react";
import styled from "styled-components";

import Header from "./CalendarHeader";
import SectionComponent from "components/Section";
import List from "components/List";
import Month from "cards/MonthSaldos";

const Container = styled.div`
    position: relative;
    height: calc(100vh - 4.75rem);
    border-radius: 4px;
    background: var(--surface-variant);
    outline: var(--border-variant);
    box-shadow: var(--shadow-variant);
    display: grid;
    grid-template-rows: auto 1fr;
`;

const Section = styled(SectionComponent)`
    overflow: auto;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
`;

function Calendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <Container>
            <Header year={year} setYear={setYear} />
            <Section>
                <List>
                    {months.map((number) => (
                        <Month
                            key={number}
                            year={year}
                            month={number}
                            isActive={month === number}
                            setActive={setMonth}
                        />
                    ))}
                </List>
            </Section>
        </Container>
    );
}

export default Calendar;
