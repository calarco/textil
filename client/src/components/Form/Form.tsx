import { MouseEvent, FormEvent, ReactNode, useRef } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";

import { Buttons } from "components/Buttons";

const Container = transition.form.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    content-visibility: auto;
    will-change: opacity;
    position: absolute;
    z-index: 1500;
    top: 1px;
    left: 1px;
    right: 1px;
    overflow: clip;
    border-radius: 4px;
    outline: 1px solid var(--primary);
    background: var(--primary);
    box-shadow: var(--shadow);
    display: grid;
    grid-auto-columns: 1fr;
    gap: 1px;
    align-items: start;

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
        transform: translateY(-1rem);
        transition: 0.15s ease-in;
    }
`;

type Props = {
    length?: number;
};

const ButtonsMod = styled(Buttons)<Props>`
    background: var(--surface);

    ${(props) =>
        props.length &&
        css`
            grid-column-end: span ${props.length};
        `};
`;

type ComponentProps = {
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
    onSubmit?: (e: FormEvent) => void;
    length?: number;
    children: ReactNode;
    className?: string;
    noButtons?: boolean;
};

const Form = function ({
    isActive,
    close,
    onSubmit,
    length,
    children,
    className,
    noButtons,
}: ComponentProps) {
    const nodeRef = useRef(null);

    return (
        <Container
            nodeRef={nodeRef}
            ref={nodeRef}
            in={isActive}
            onSubmit={onSubmit}
            className={className}
        >
            {children}
            {!noButtons && (
                <ButtonsMod length={length}>
                    <button type="button" onClick={close}>
                        Cancelar
                    </button>
                    <button type="submit">Guardar</button>
                </ButtonsMod>
            )}
        </Container>
    );
};

export default Form;
