import styled, { css } from "styled-components";

import SectionComponent from "components/Section";

const Year = styled.ul`
    position: sticky;
    top: 0;
    z-index: 900;
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    display: grid;
    grid-template-columns: 5rem 1fr;
    align-items: center;
    text-transform: capitalize;

    h6 {
        color: var(--on-background-variant);
    }
`;

const Section = styled(SectionComponent)`
    overflow: auto;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
`;

type Props = {
    readonly isActive?: boolean;
};

const Month = styled.div<Props>`
    position: relative;
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    align-items: center;
    text-transform: capitalize;

    &:not(:first-child)::after {
        content: "";
        position: absolute;
        top: -0.5rem;
        z-index: 0;
        width: 100%;
        border-top: var(--border-variant);
    }

    ${(props) =>
        props.isActive &&
        css`
            h4 {
                color: var(--secondary);
            }
        `};
`;

const Columns = styled.div`
    text-align: right;

    pre:not(:last-child) {
        font: var(--label-alt);
        color: var(--on-background-variant);

        span {
            color: var(--on-background-variant);
        }
    }
`;

function Calendar() {
    const months = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    return (
        <>
            <Year>
                <h4>{2021}</h4>
                <Columns>
                    <pre>
                        $<span>2.429.664,24</span>
                    </pre>
                </Columns>
            </Year>
            <Section>
                {months.map((number) => (
                    <Month
                        key={number}
                        isActive={number === new Date().getMonth()}
                    >
                        <h4>
                            {new Date(2021, number, 1).toLocaleDateString(
                                "default",
                                {
                                    month: "long",
                                }
                            )}
                        </h4>
                        <Columns>
                            <pre>
                                $<span>-105.113,33</span>
                            </pre>
                        </Columns>
                    </Month>
                ))}
            </Section>
        </>
    );
}

export default Calendar;
