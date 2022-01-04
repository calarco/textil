import styled, { css } from "styled-components";

import useTotal from "hooks/useTotal";
import Currency from "components/Currency";

const Container = styled.div`
    width: 100%;
    height: 6rem;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: center;
`;

type Props = {
    readonly isCurrent?: boolean;
    readonly isActive?: boolean;
};

const Box = styled.div<Props>`
    width: 100%;
    padding: 0 1.5rem 0 0.5rem;
    min-height: 3rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;

    ${(props) =>
        props.isActive &&
        css`
            h4 {
                color: var(--secondary);
            }
        `};
`;

const Years = styled.div`
    overflow: clip;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
    display: grid;
    grid-auto-flow: column;

    button {
        padding: 0.5rem 1.25rem;
        border-radius: 0;
        font: 500 0.9rem/1.5rem var(--font-family-alt);
    }

    button:nth-child(2) {
        padding: 0.5rem 1.5rem;
        pointer-events: none;
        background: var(--primary-variant);
    }
`;

const Details = styled.div`
    padding: 0.5rem 1rem;
    height: 2.5rem;
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
            border-left: var(--border-variant);
        }
    }
`;

type ComponentProps = {
    year: number;
    setYear: (year: number) => void;
};

function CalendarHeader({ year, setYear }: ComponentProps) {
    const { pagos, cobros } = useTotal({
        gte: `${year}-01-01`,
        lte: `${year}-12-31`,
    });

    return (
        <Container>
            <Box>
                <Years>
                    <button onClick={() => setYear(year - 1)}>{"<"}</button>
                    <button>{year}</button>
                    <button onClick={() => setYear(year + 1)}>{">"}</button>
                </Years>
                <Currency number={cobros - pagos} integer />
            </Box>
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
        </Container>
    );
}

export default CalendarHeader;
