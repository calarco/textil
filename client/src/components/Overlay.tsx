import { MouseEvent, useRef } from "react";
import { css } from "styled-components";
import transition from "styled-transition-group";

type Props = {
    readonly long?: boolean;
};

const Container = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 250,
    },
})<Props>`
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
        transition: 0.3s ease-out;

        ${(props: Props) =>
            props.long &&
            css`
                height: 1000%;
            `};
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
    long?: boolean;
    className?: string;
};

function Overlay({ overlay, cancel, long, className }: ComponentProps) {
    const nodeRef = useRef(null);

    return (
        <Container
            nodeRef={nodeRef}
            ref={nodeRef}
            in={overlay}
            long={long}
            onClick={cancel}
            className={className}
        />
    );
}

export default Overlay;
