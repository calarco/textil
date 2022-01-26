import { useState } from "react";
import styled from "styled-components";

import Header from "./CalendarHeader";
import Panel from "components/Panel";
import SectionComponent from "components/Section";
import List from "components/List";
import Month from "./cards/MonthCard";

const Section = styled(SectionComponent)`
    overflow: auto;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
`;

function CalendarPanel() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <Panel>
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
        </Panel>
    );
}

export default CalendarPanel;