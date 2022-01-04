import styled, { css } from "styled-components";

import useTotal from "hooks/useTotal";
import Card from "components/Card";
import Currency from "components/Currency";
import transition from "styled-transition-group";

type Props = {
    readonly isCurrent?: boolean;
};

const Box = styled.div<Props>`
    width: 100%;
    min-height: 3rem;
    padding: 0.75rem 1.75rem;
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    align-items: center;
    text-transform: capitalize;
    transition: 0.2s ease-in;

    ${(props) =>
        props.isCurrent &&
        css`
            h4 {
                color: var(--secondary);
            }
        `};
`;

const Details = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    padding: 0.75rem 1rem;
    overflow: clip;
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

    &:enter {
        max-height: 0;
    }

    &:enter-active {
        max-height: 3rem;
        transition: 0.2s ease-out;
    }

    &:exit {
        max-height: 3rem;
    }

    &:exit-active {
        max-height: 0;
        transition: 0.15s ease-in;
    }
`;

type ComponentProps = {
    year: number;
    month: number;
    isActive?: boolean;
    setActive: (active: number) => void;
};

function Month({ year, month, isActive, setActive }: ComponentProps) {
    const { pagos, cobros } = useTotal({
        gte: `${year}-${(month + 1).toString().padStart(2, "0")}-01`,
        lte: `${year}-${(month + 1).toString().padStart(2, "0")}-${new Date(
            year,
            month + 1,
            0
        ).getDate()}`,
    });

    return (
        <Card isActive={isActive}>
            <Box
                isCurrent={month === new Date().getMonth()}
                onClick={() => {
                    isActive ? setActive(12) : setActive(month);
                }}
            >
                <h4>
                    {new Date(year, month, 1).toLocaleDateString("default", {
                        month: "long",
                    })}
                </h4>
                <Currency number={cobros - pagos} integer />
            </Box>
            <Details in={isActive}>
                <label>
                    Pagos
                    <Currency number={pagos} integer />
                </label>
                <label>
                    Cobros
                    <Currency number={cobros} integer />
                </label>
            </Details>
        </Card>
    );
}

export default Month;
