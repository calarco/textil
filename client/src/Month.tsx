import styled, { css } from "styled-components";

import useTotal from "hooks/useTotal";
import Card from "components/Card";
import Currency from "components/Currency";

type Props = {
    readonly isCurrent?: boolean;
    readonly isActive?: boolean;
};

const Box = styled.div<Props>`
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
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

    ${(props) =>
        props.isActive &&
        css`
            background: var(--surface);
            box-shadow: var(--shadow);
            transition: 0.3s ease-out;
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

type ComponentProps = {
    month: number;
    isActive?: boolean;
    setActive: (active: number) => void;
};

function Month({ month, isActive, setActive }: ComponentProps) {
    const { pagos, cobros } = useTotal({
        gte: `2021-${(month + 1).toString().padStart(2, "0")}-01`,
        lte: `2021-${(month + 1).toString().padStart(2, "0")}-${new Date(
            2021,
            month + 1,
            0
        ).getDate()}`,
    });

    return (
        <Card isActive={isActive}>
            <Box
                isCurrent={month === new Date().getMonth()}
                isActive={isActive}
                onClick={() => {
                    isActive ? setActive(12) : setActive(month);
                }}
            >
                <h4>
                    {new Date(2021, month, 1).toLocaleDateString("default", {
                        month: "long",
                    })}
                </h4>
                <Currency number={cobros - pagos} integer />
            </Box>
            {isActive && (
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
            )}
        </Card>
    );
}

export default Month;
