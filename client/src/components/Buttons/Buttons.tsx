import { ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
    readonly hide?: boolean;
};

const Container = styled.div<Props>`
    grid-column-start: 1;
    grid-column-end: span end;
    position: relative;
    width: 100%;
    max-height: 3rem;
    border-radius: 0 0 4px 4px;
    overflow: clip;
    display: flex;
    gap: 1px;
    transition: 0.15s ease-in;

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

    ${(props) =>
        props.hide &&
        css`
            max-height: 0;
        `};
`;

type ComponentProps = {
    hide?: boolean;
    children: ReactNode;
    className?: string;
};

const Buttons = function ({ hide, children, className }: ComponentProps) {
    return (
        <Container hide={hide} className={className}>
            {children}
        </Container>
    );
};

export default Buttons;
