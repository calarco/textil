import styled, { css } from "styled-components";

import SectionComponent from "components/Section";
import Card from "components/Card";
import { useState } from "react";

const Year = styled.div`
    width: 100%;
    min-height: 3rem;
`;

const Years = styled.div`
    border-radius: 4px 0 0 0;
    overflow: clip;
    display: grid;
    grid-auto-flow: column;

    button {
        border-radius: 0;
    }

    button:nth-child(2) {
        pointer-events: none;
        background: var(--primary-variant);
        border-bottom: 2px solid var(--primary);
    }
`;

const Number = styled.pre`
    align-self: center;
    text-align: right;
    font: var(--label-alt);
    color: var(--on-background-variant);

    span {
        font: var(--label-alt);
    }
`;

const Section = styled(SectionComponent)`
    overflow: auto;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
`;

type Props = {
    readonly isCurrent?: boolean;
    readonly isActive?: boolean;
};

const Box = styled.div<Props>`
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    align-items: center;
    text-transform: capitalize;
    transition: 0.2s ease-in;

    ${(props) =>
        props.isCurrent &&
        css`
            h4 {
                color: var(--secondary);
            }
        `};

    ${(props) =>
        props.isActive &&
        css`
            background: var(--surface);
            box-shadow: var(--shadow);
            transition: 0.3s ease-out;
        `};
`;

const Box1 = styled.div<Props>`
    width: 100%;
    padding-right: 1.5rem;
    min-height: 3rem;
    display: grid;
    grid-template-columns: 1fr 10rem;
    text-transform: capitalize;

    ${(props) =>
        props.isActive &&
        css`
            h4 {
                color: var(--secondary);
            }
        `};
`;

const Details = styled.div`
    padding: 0.75rem 1rem;
    border-top: var(--border-variant);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    label {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: -1rem;
            height: 2rem;
            border-left: 1px solid var(--primary-variant);
        }
    }
`;

function Calendar() {
    const [active, setActive] = useState(12);
    const months = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    return (
        <>
            <Year>
                <Box1>
                    <Years>
                        <button>{2020}</button>
                        <button>{2021}</button>
                        <button>{2022}</button>
                    </Years>
                    <Number>
                        $
                        <span>
                            -197.340<small>02</small>
                        </span>
                    </Number>
                </Box1>
                <Details>
                    <label>
                        Pagos
                        <Number>
                            $
                            <span>
                                2.369.337<small>53</small>
                            </span>
                        </Number>
                    </label>
                    <label>
                        Cobros
                        <Number>
                            $
                            <span>
                                2.171.997<small>51</small>
                            </span>
                        </Number>
                    </label>
                </Details>
            </Year>
            <Section>
                {months.map((number) => (
                    <Card isActive={active === number}>
                        <Box
                            key={number}
                            isCurrent={number === new Date().getMonth()}
                            isActive={active === number}
                            onClick={() => {
                                active === number
                                    ? setActive(12)
                                    : setActive(number);
                            }}
                        >
                            <h4>
                                {new Date(2021, number, 1).toLocaleDateString(
                                    "default",
                                    {
                                        month: "long",
                                    }
                                )}
                            </h4>
                            <Number>
                                $<span>273.612</span>
                            </Number>
                        </Box>
                        {active === number && (
                            <Details>
                                <label>
                                    Pagos
                                    <Number>
                                        $<span>185.113</span>
                                    </Number>
                                </label>
                                <label>
                                    Cobros
                                    <Number>
                                        $<span>85.113</span>
                                    </Number>
                                </label>
                            </Details>
                        )}
                    </Card>
                ))}
            </Section>
        </>
    );
}

export default Calendar;
