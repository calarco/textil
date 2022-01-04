import { MouseEvent, ReactNode } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";

type Props = {
    overlay?: boolean;
};

const Container = styled.section<Props>`
    content-visibility: auto;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 25rem;
    max-height: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    background: var(--surface);
    box-shadow: var(--shadow);
    overflow-y: overlay;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: 0.3s ease-out;

    ${(props) =>
        props.overlay &&
        css`
            overflow: clip;
        `};
`;

const Overlay = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 250,
    },
})`
    content-visibility: auto;
    will-change: opacity;
    position: absolute;
    z-index: 1001;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    background: var(--overlay);
    backdrop-filter: blur(0.5rem);

    &:enter {
        opacity: 0;
    }

    &:enter-active {
        opacity: 1;
        height: 1000%;
        transition: 0.3s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.25s ease-in;
    }
`;

type ComponentProps = {
    overlay?: boolean;
    cancel?: (e: MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
    className?: string;
};

const Section = function ({
    overlay,
    cancel,
    children,
    className,
}: ComponentProps) {
    return (
        <Container overlay={overlay} className={className}>
            {children}
            <Overlay in={overlay} onClick={cancel} />
        </Container>
    );
};

export default Section;
