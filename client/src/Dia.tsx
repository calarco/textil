import styled, { css } from "styled-components";

type Props = {
    isCurrent?: boolean;
    weekend?: boolean;
};

const Container = styled.label<Props>`
    position: relative;
    height: 3rem;
    padding: 0 0.5rem;
    text-transform: uppercase;
    text-align: center;
    display: grid;
    grid-template-rows: auto auto;

    h3 {
        font: 400 1.25rem/1.75rem var(--font-family-alt);
    }

    p {
        font: 400 0.9rem/1.25rem var(--font-family-alt);
    }

    ${(props) =>
        props.weekend &&
        css`
            & > * {
                color: var(--on-background-variant);
            }
        `};

    ${(props) =>
        props.isCurrent &&
        css`
            & > * {
                color: var(--secondary);
            }
        `};
`;

type ComponentProps = {
    isCurrent?: boolean;
    weekend?: boolean;
    date: number[];
};

const Dia = function ({ isCurrent, weekend, date }: ComponentProps) {
    return (
        <Container isCurrent={isCurrent} weekend={weekend}>
            <h3>{date[2]}</h3>
            <p>
                {new Date(date[0], date[1], date[2])
                    .toLocaleDateString("default", {
                        weekday: "short",
                    })
                    .substring(0, 3)}
            </p>
        </Container>
    );
};

export default Dia;
