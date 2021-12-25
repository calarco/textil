import styled, { css } from "styled-components";

import useTotal from "hooks/useTotal";
import Currency from "components/Currency";

const Container = styled.div`
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
        font: 500 0.9rem/1.5rem var(--font-family-alt);
    }

    button:nth-child(2) {
        pointer-events: none;
        background: var(--primary-variant);
        border-bottom: 2px solid var(--primary);
    }
`;

type Props = {
    readonly isCurrent?: boolean;
    readonly isActive?: boolean;
};

const Box = styled.div<Props>`
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
            border-left: var(--border-variant);
        }
    }
`;

type ComponentProps = {
    year: number;
    setYear: (year: number) => void;
};

function App({ year, setYear }: ComponentProps) {
    const { pagos, cobros } = useTotal({
        gte: `${year}-01-01`,
        lte: `${year}-12-31`,
    });

    return (
        <Container>
            <Box>
                <Years>
                    <button onClick={() => setYear(year - 1)}>
                        {year - 1}
                    </button>
                    <button>{year}</button>
                    <button onClick={() => setYear(year + 1)}>
                        {year + 1}
                    </button>
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

export default App;
