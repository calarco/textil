import { FocusEventHandler, ReactNode, useRef } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

type Props = {
    text?: boolean;
    length?: number;
    error?: boolean;
};

const Container = styled.label<Props>`
    position: relative;
    height: 100%;
    min-height: 5rem;
    padding: 0.5rem 1rem 0.75rem 1rem;
    background: var(--surface);
    display: grid;
    align-content: space-between;
    gap: 0.25rem 1rem;
    text-transform: capitalize;
    transition: 0.15s ease-in;

    ${(props) =>
        !props.text &&
        css`
            grid-auto-flow: column;
            justify-content: start;
        `};

    ${(props) =>
        props.length &&
        css`
            grid-column-end: span ${props.length};
        `};

    ${(props) =>
        !props.error &&
        css`
            &:focus-within {
                color: var(--primary);
            }
        `};

    ${(props) =>
        props.error &&
        css`
            font-weight: 500;
            color: var(--error);
            transition: 0.2s ease-out;

            input[type="search"],
            input[type="text"],
            input[type="number"],
            input[type="email"],
            input[type="tel"],
            input[type="date"],
            input[type="time"],
            input[type="password"],
            textarea,
            select {
                outline: 1px solid var(--error-variant);
            }
        `};
`;

const Title = transition.span.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    will-change: opacity;
    font: inherit;
    color: inherit;
    margin: 0;
    display: grid;
    gap: 1rem;

    span {
        font: inherit;
        color: inherit;
    }

    &:enter {
        opacity: 0;
        transform: translateY(-1rem);
    }

    &:enter-active {
        opacity: 1;
        transform: initial;
        transition: 0.2s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.15s ease-in;
    }
`;

const Children = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap: 0.75rem;
    align-items: center;
`;

type ComponentProps = {
    title?: string;
    length?: number;
    error?: string;
    onBlur?: FocusEventHandler<HTMLLabelElement>;
    className?: string;
    children: ReactNode;
};

const Label = function ({
    title,
    length,
    error,
    onBlur,
    className,
    children,
}: ComponentProps) {
    const nodeRef = useRef(null);

    return (
        <Container
            text={title ? true : false}
            error={error ? true : false}
            length={length}
            onBlur={onBlur}
            className={className}
        >
            {title && (
                <SwitchTransition>
                    <Title nodeRef={nodeRef} ref={nodeRef} key={error ? 0 : 1}>
                        {error ? error : title}
                    </Title>
                </SwitchTransition>
            )}
            <Children>{children}</Children>
        </Container>
    );
};

export default Label;
