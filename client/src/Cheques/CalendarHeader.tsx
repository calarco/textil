import { useRef } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import useTotal from "./hooks/useTotal";
import Details from "components/Details";
import { Currency } from "components/Currency";

const Container = styled.div`
    width: 100%;
    height: 6.25rem;
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

const Selector = styled.div`
    overflow: clip;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
    display: grid;
    grid-auto-flow: column;

    > button {
        padding: 0.5rem 1.25rem;
        border-radius: 0;
        font: 500 0.9rem/1.5rem var(--font-family-alt);
    }

    > div {
        background: var(--primary-variant);
    }
`;

const Year = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
    padding: 0.5rem 1.5rem;
    color: var(--primary);
    font: 500 0.9rem/1.5rem var(--font-family-alt);
    
    &:enter {
        opacity: 0;
        transform: translateY(-1rem);
    }

    &:enter-active {
        opacity: 1;
        transform: initial;
        transition: 0.3s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.15s ease-in;
    }
`;

type ComponentProps = {
    year: number;
    setYear: (year: number) => void;
};

function CalendarHeader({ year, setYear }: ComponentProps) {
    const nodeRef = useRef(null);
    const { pagos, cobros, loadingPagos, loadingCobros } = useTotal({
        gte: `${year}-01-01`,
        lte: `${year}-12-31`,
    });

    return (
        <Container>
            <Box>
                <Selector>
                    <button onClick={() => setYear(year - 1)}>{"<"}</button>
                    <div>
                        <SwitchTransition>
                            <Year nodeRef={nodeRef} ref={nodeRef} key={year}>
                                {year}
                            </Year>
                        </SwitchTransition>
                    </div>
                    <button onClick={() => setYear(year + 1)}>{">"}</button>
                </Selector>
                <Currency
                    number={cobros - pagos}
                    loading={loadingPagos || loadingCobros}
                    integer
                />
            </Box>
            <Details fixed>
                <label>
                    Pagos
                    <Currency number={pagos} loading={loadingPagos} integer />
                </label>
                <label>
                    Cobros
                    <Currency number={cobros} loading={loadingCobros} integer />
                </label>
            </Details>
        </Container>
    );
}

export default CalendarHeader;
