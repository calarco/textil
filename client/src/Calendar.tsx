import { useState } from "react";
import styled, { css } from "styled-components";

import useTotal from "hooks/useTotal";
import SectionComponent from "components/Section";
import Currency from "components/Currency";
import Month from "Month";

const Year = styled.div`
    width: 100%;
    min-height: 3rem;
`;

const Years = styled.div`
    border-radius: 4px 0 0 0;
    overflow: clip;
    display: grid;
    grid-auto-flow: column;

    button {
        border-radius: 0;
    }

    button:nth-child(2) {
        pointer-events: none;
        background: var(--primary-variant);
        border-bottom: 2px solid var(--primary);
    }
`;

const Section = styled(SectionComponent)`
    overflow: auto;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
`;

type Props = {
    readonly isCurrent?: boolean;
    readonly isActive?: boolean;
};

const Box1 = styled.div<Props>`
    width: 100%;
    padding-right: 1.5rem;
    min-height: 3rem;
    display: grid;
    grid-template-columns: 1fr 10rem;
    text-transform: capitalize;

    ${(props) =>
        props.isActive &&
        css`
            h4 {
                color: var(--secondary);
            }
        `};
`;

const Details = styled.div`
    padding: 0.75rem 1rem;
    border-top: var(--border-variant);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    label {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: -1rem;
            height: 2rem;
            border-left: 1px solid var(--primary-variant);
        }
    }
`;

function Calendar() {
    const [active, setActive] = useState(new Date().getMonth());
    const months = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const { pagos, cobros } = useTotal({
        gte: `2021-01-01`,
        lte: `2021-12-31`,
    });

    return (
        <>
            <Year>
                <Box1>
                    <Years>
                        <button>{2020}</button>
                        <button>{2021}</button>
                        <button>{2022}</button>
                    </Years>
                    <Currency number={cobros - pagos} integer />
                </Box1>
                <Details>
                    <label>
                        Pagos
                        <Currency number={pagos} integer />
                    </label>
                    <label>
                        Cobros
                        <Currency number={cobros} integer />
                    </label>
                </Details>
            </Year>
            <Section>
                {months.map((number) => (
                    <Month
                        key={number}
                        month={number}
                        isActive={active === number}
                        setActive={setActive}
                    />
                ))}
            </Section>
        </>
    );
}

export default Calendar;
