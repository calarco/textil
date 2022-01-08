import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
    grid-column-start: 1;
    grid-column-end: span end;
    position: relative;
    width: 100%;
    height: 3rem;
    border-radius: 0 0 4px 4px;
    overflow: clip;
    border-top: var(--border-variant);
    display: flex;
    gap: 1px;

    button {
        width: 100%;
        height: 3rem;
        padding: 0 1.5rem;
        border-radius: 0px;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: -1px;
            height: 2rem;
            border-left: var(--border-variant);
        }
    }
`;

type ComponentProps = {
    children: ReactNode;
    className?: string;
};

const Buttons = function ({ children, className }: ComponentProps) {
    return <Container className={className}>{children}</Container>;
};

export default Buttons;
