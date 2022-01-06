import { MouseEvent, ReactNode, useRef } from "react";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

const Container = transition.section.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
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
    switchOn?: string;
    overlay?: boolean;
    cancel?: (e: MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
    className?: string;
};

const Section = function ({
    switchOn,
    overlay,
    cancel,
    children,
    className,
}: ComponentProps) {
    const nodeRef = useRef(null);

    return (
        <SwitchTransition>
            <Container
                nodeRef={nodeRef}
                ref={nodeRef}
                key={switchOn || 0}
                overlay={overlay}
                className={className}
            >
                {children}
                <Overlay
                    nodeRef={nodeRef}
                    ref={nodeRef}
                    in={overlay}
                    onClick={cancel}
                />
            </Container>
        </SwitchTransition>
    );
};

export default Section;
