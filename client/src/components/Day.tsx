import styled from "styled-components";

const Container = styled.pre`
    font: var(--label-alt);
    color: var(--on-background-variant);

    span {
        font: var(--label-alt);
    }
`;

type ComponentProps = {
    date: string;
};

const Day = function ({ date }: ComponentProps) {
    return (
        <Container>
            {date.substring(8, 10)}
            <span>
                {new Date(date)
                    .toLocaleDateString("default", {
                        month: "short",
                    })
                    .substring(0, 3)
                    .toUpperCase()}
            </span>
            <small>{date.substring(0, 4)}</small>
        </Container>
    );
};

export default Day;
