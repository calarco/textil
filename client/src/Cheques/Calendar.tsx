import { useState } from "react";
import styled from "styled-components";

import Header from "./CalendarHeader";
import SectionComponent from "components/Section";
import Month from "cards/Month";

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
        <>
            <Header year={year} setYear={setYear} />
            <Section>
                {months.map((number) => (
                    <Month
                        key={number}
                        year={year}
                        month={number}
                        isActive={month === number}
                        setActive={setMonth}
                    />
                ))}
            </Section>
        </>
    );
}

export default Calendar;
