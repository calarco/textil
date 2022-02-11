import { ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
    readonly fixed?: boolean;
};

const Container = styled.div<Props>`
    border-top: var(--border-variant);
    display: grid;
    gap: 1px;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;

    > label {
        position: relative;
        padding: 0.75rem 1rem;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        justify-content: center;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: -1px;
            height: 2rem;
            border-left: var(--border-variant);
        }

        ${(props) =>
            props.fixed &&
            css`
                grid-template-columns: auto 1fr;
            `};
    }
`;

type ComponentProps = {
    fixed?: boolean;
    children: ReactNode;
    className?: string;
};

const Details = function ({ fixed, children, className }: ComponentProps) {
    return (
        <Container fixed={fixed} className={className}>
            {children}
        </Container>
    );
};

export default Details;
