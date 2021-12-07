import styled from "styled-components";

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

const Container = styled.main`
    overflow: auto;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
`;

const Month = styled.div`
    position: sticky;
    top: 0;
    z-index: 900;
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    align-items: center;
    text-transform: capitalize;

    h6 {
        color: var(--on-background-variant);
    }
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    text-align: right;

    pre:not(:last-child) {
        font: var(--label-alt);
        color: var(--on-background-variant);
    }
`;

function Calendar() {
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <>
            <Year>
                <h4>{2021}</h4>
                <Columns>
                    <pre>$2.664.357,15</pre>
                    <pre>$2.559.243,82</pre>
                    <pre>-$105.113,33</pre>
                </Columns>
            </Year>
            <Container>
                {months.map((number) => (
                    <Month key={number}>
                        <h4>
                            {new Date(2021, number, 1).toLocaleDateString(
                                "default",
                                {
                                    month: "long",
                                }
                            )}
                        </h4>
                        <Columns>
                            <pre>$2.664.357,15</pre>
                            <pre>$2.559.243,82</pre>
                            <pre>-$105.113,33</pre>
                        </Columns>
                    </Month>
                ))}
            </Container>
        </>
    );
}

export default Calendar;
