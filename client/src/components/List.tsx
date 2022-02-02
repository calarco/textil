import { ReactNode, useRef } from "react";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

const Container = transition.section.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
    position: relative;
    padding: 0.75rem;
    display: grid;
    align-content: start;
    gap: 0.75rem;

    &:enter {
        opacity: 0;
    }

    &:enter-active {
        opacity: 1;
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

const Loading = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    will-change: opacity;
    position: absolute;
    z-index: 1001;
    top: 0;
    right: 0;
    left: 0;
    height: 0.25rem;
    border-radius: 4px;
    background: var(--primary);
    -webkit-animation: sk-scaleout 1s infinite ease-in-out;
    animation: sk-scaleout 1s infinite ease-in-out;

    @keyframes sk-scaleout {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }

    &:enter {
        opacity: 0;
    }

    &:enter-active {
        opacity: 1;
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

type ComponentProps = {
    switchOn?: string;
    loading?: boolean;
    children: ReactNode;
    className?: string;
};

function List({ switchOn, loading, children, className }: ComponentProps) {
    const nodeRef = useRef(null);

    return (
        <SwitchTransition>
            <Container
                nodeRef={nodeRef}
                ref={nodeRef}
                key={switchOn || 0}
                className={className}
            >
                {children}
                <Loading nodeRef={nodeRef} ref={nodeRef} in={loading} />
            </Container>
        </SwitchTransition>
    );
}

export default List;
