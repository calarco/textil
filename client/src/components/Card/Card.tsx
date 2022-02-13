import { ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
    readonly isActive?: boolean;
    readonly isForm?: boolean;
    readonly isRemove?: boolean;
};

const Container = styled.div<Props>`
    position: relative;
    border-radius: 4px;
    transition: 0.2s ease-in;

    ${(props) =>
        !props.isActive &&
        !props.isForm &&
        css`
            &:hover {
                cursor: pointer;
                background: var(--secondary-variant);
                transition: 0.2s ease-in;
            }
        `};

    ${(props) =>
        props.isActive &&
        css`
            position: sticky;
            top: 0;
            bottom: 0;
            z-index: 1000;
            background: var(--primary-variant);
            backdrop-filter: blur(0.7rem);
            box-shadow: var(--shadow-variant);
            transition: 0.3s ease-out;

            &:hover {
                cursor: default;
            }
        `};

    ${(props) =>
        props.isForm &&
        css`
            position: sticky;
            top: 0;
            z-index: 1500;
            backdrop-filter: none;
            box-shadow: var(--shadow-variant);
        `};

    ${(props) =>
        props.isRemove &&
        css`
            backdrop-filter: none;
        `};

    &:not(:first-child)::after {
        content: "";
        position: absolute;
        left: 0;
        top: calc(-0.75rem / 2);
        right: 0;
        z-index: 0;
        border-top: var(--border-variant);

        ${(props) =>
            props.isForm &&
            css`
                border-top: 1px solid rgba(0, 0, 0, 0);
                transition: 0.3s ease-out;
            `};
    }
`;

type ComponentProps = {
    isActive?: boolean;
    isRemove?: boolean;
    isForm?: boolean;
    children: ReactNode;
    className?: string;
};

const Card = function ({
    isActive,
    isRemove,
    isForm,
    children,
    className,
}: ComponentProps) {
    return (
        <Container
            isActive={isActive}
            isForm={isForm}
            isRemove={isRemove}
            className={className}
        >
            {children}
        </Container>
    );
};

export default Card;
