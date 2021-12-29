import { MouseEvent, ReactNode } from "react";
import styled, { css } from "styled-components";

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
    padding: 1px;
    border-radius: 4px;
    background: var(--surface);
    box-shadow: var(--shadow);
    overflow-y: overlay;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-out;

    ${(props) =>
        props.overlay &&
        css`
            overflow: clip;
        `};
`;

const Overlay = styled.div<Props>`
    content-visibility: auto;
    will-change: opacity;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    z-index: 1001;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    background: var(--overlay);
    backdrop-filter: blur(0.5rem);
    transition: 0.25s ease-in;

    ${(props) =>
        props.overlay &&
        css`
            visibility: visible;
            height: 1000%;
            opacity: 1;
            transform: initial;
            transition: 0.3s ease-out;
        `};
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
            <Overlay overlay={overlay} onClick={cancel} />
        </Container>
    );
};

export default Section;
