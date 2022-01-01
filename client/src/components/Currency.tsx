import styled from "styled-components";

const Container = styled.pre`
    text-align: right;
    font: var(--label-alt);
    color: var(--on-background-variant);

    span {
        font: var(--label-alt);
    }
`;

type ComponentProps = {
    number: number;
    integer?: boolean;
};

const Currency = function ({ number, integer }: ComponentProps) {
    const numbers = number.toString().split(".");

    return (
        <Container>
            $
            <span>
                {numbers[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                {!integer && <small>{numbers[1]}</small>}
            </span>
        </Container>
    );
};

export default Currency;
