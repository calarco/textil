import { useState } from "react";

import Header from "./CalendarHeader";
import { Panel } from "components/Panel";
import { Section } from "components/Section";
import { List } from "components/List";
import Month from "./cards/MonthCard";

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
