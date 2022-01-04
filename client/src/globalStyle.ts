import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const Device = {
    tablet: `(min-width: 768px)`,
    laptop: `(min-width: 1024px)`,
    desktop: `(min-width: 1440px)`,
};

const GlobalStyle = createGlobalStyle`
    ${normalize}

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--overlay);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: var(--secondary-variant);
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--primary-variant);
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :root {
        -moz-tab-size: 4;
        tab-size: 4;
    }

    #root, html, body {
        height: 100vh;
        width: 100vw;
    }

    html {
        font-size: 16px;
	    scroll-behavior: smooth;
    }
    
    body {
        --shadow: ${(props) => props.theme.shadows.surface};
        --shadow-variant: ${(props) => props.theme.shadows.surfaceVariant};

        --border: ${(props) => props.theme.borders.border};
        --border-variant: ${(props) => props.theme.borders.borderVariant};
        --border-primary: ${(props) => props.theme.borders.borderPrimary};

        --background: ${(props) => props.theme.colors.background};
        --surface: ${(props) => props.theme.colors.surface};
        --surface-t: ${(props) => props.theme.colors.surfaceT};
        --surface-variant: ${(props) => props.theme.colors.surfaceVariant};
        --primary: ${(props) => props.theme.colors.primary};
        --primary-variant: ${(props) => props.theme.colors.primaryVariant};
        --secondary: ${(props) => props.theme.colors.secondary};
        --secondary-variant: ${(props) => props.theme.colors.secondaryVariant};
        --on-background: ${(props) => props.theme.colors.onBackground};
        --on-background-variant: ${(props) =>
            props.theme.colors.onBackgroundVariant};
        --on-background-disabled: ${(props) =>
            props.theme.colors.onBackgroundDisabled};
        --error: ${(props) => props.theme.colors.error};
        --error-variant: ${(props) => props.theme.colors.errorVariant};
        --overlay: ${(props) => props.theme.colors.overlay};

        --font-family: "Supreme-Variable";
        --font-family-alt: "SpaceMono-Regular";

        --label: 300 0.75rem/1.25rem var(--font-family);
        --label-alt: 300 0.75rem/1.25rem var(--font-family-alt);
        --body1: 300 0.9rem/1.25rem var(--font-family);
        --body2: 500 0.9rem/1.5rem var(--font-family);
        --body-alt: 300 0.9rem/1.25rem var(--font-family-alt);
        --subhead1: 300 1rem/1.5rem var(--font-family);
        --subhead2: 500 1rem/1.75rem var(--font-family);
        --title: 500 1.25rem/1.75rem var(--font-family);
        --headline: 300 1.5rem/2rem var(--font-family);
        --display-1: 300 2rem/2.5rem var(--font-family);

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern" 1;
        font-kerning: normal;
        font-family: var(--font-family), var(--font-family-alt), sans-serif;

        background: var(--background);
        color: var(--on-background);
        
        overflow: clip;
        user-select: none;
    }

    pre,
    p,
    h6,
    h5,
    h4,
    h3,
    h2,
    h1,
    label {
        display: inline-block;
        margin: 0;
        color: var(--on-background);

        span, small {
            margin-left: 0.75em;
            color: var(--on-background-variant);
        }
    }

    pre {
        font: var(--body-alt);

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 1.25) * 0.5em);
        }

        span {
            color: var(--on-background);
        }
    }

    p {
        font: var(--body1);

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 1.25) * 0.5em);
        }

        small {
            font: var(--label);
        }
    }

    h6 {
        font: var(--body2);

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 1.5) * 0.5em);
        }

        small {
            font: var(--body1);
        }

        span {
            font: var(--subhead1);
        }
    }

    h5 {
        font: var(--subhead1);

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 1.5) * 0.5em);
        }

        small {
            font: var(--body1);
        }
    }

    h4 {
        font: var(--subhead2);

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 2.25) * 0.5em);
        }

        small {
            font: var(--body1);
        }
    }

    h3 {
        font: var(--title);

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 2.25) * 0.5em);
        }
    }

    h2 {
        font: var(--headline);

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 2) * 0.5em);
        }

        small {
            font: var(--subhead1);
        }
    }

    h1 {
        font: var(--display-1);
        text-align: center;

        &::before {
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            margin-top: calc((1 - 2.5) * 0.5em);
        }
    }

    label {
        font: var(--label);
        color: var(--on-background-variant);

        span {
            font: var(--subhead1);
            color: var(--on-background);
        }

        pre,
        p,
        h6,
        h5,
        h4,
        h3,
        h2,
        h1 {
            display: block;
            color: var(--on-background);
        }
    }

    fieldset {
        margin: 0;
        padding: 0;
        border: none;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    input::placeholder {
        color: var(--on-background-variant);
    }

    input[type="search"],
    input[type="text"],
    input[type="number"],
    input[type="email"],
    input[type="tel"],
    input[type="time"],
    input[type="password"],
    textarea {
        display: block;
        width: 100%;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        background: none;
        border: none;
        outline: var(--border-variant);
        font: var(--subhead1);
        color: var(--on-background);
        transition: 0.1s ease-in;
        
        &:hover {
            outline: 1px solid var(--primary-variant);
            transition: 0.15s ease-out;
        }
        
        &:focus {
            outline: 1px solid rgba(0, 0, 0, 0);
            background: var(--primary-variant);
            box-shadow: var(--shadow-variant);
            color: var(--on-background);
            transition: 0.15s ease-out;
        }
    }

    input[type="search"] {
        height: 3rem;
        padding: 0 1.5rem;
        border-radius: 4px 4px 0 0;
        outline: none;
        text-transform: uppercase;
    }

    input[type="number"] {
        width: 100%;
        text-align: inherit;
    }

    textarea {
        resize: none;
    }

    input[name="proveedor"],
    input[name="cliente"],
    input[name="banco"],
    input[type="date"],
    select {
        display: block;
        appearance: none;
        width: 100%;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        background: var(--secondary-variant);
        border: none;
        outline: 1px solid rgba(0, 0, 0, 0);
        font: var(--subhead1);
        color: var(--on-background);
        transition: 0.1s ease-in;

        &:not(:disabled):hover {
            cursor: pointer;
            background: var(--primary-variant);
        }

        &:focus {
            background: var(--primary-variant);
            outline: var(--border-primary);
            box-shadow: var(--shadow-variant);
        }
        
        &:disabled {
            opacity: 0.5;
        }

        &::-webkit-calendar-picker-indicator {
            display: none !important;
        }
    }

    input[type="date"] {
        appearance: initial;
        width: auto;
        font: 300 1rem/1.5rem var(--font-family-alt);

        &::-webkit-calendar-picker-indicator {
            display: initial !important;
        }
    }
    
    select option {
        background: var(--surface);
        color: var(--on-background);
    }

    input[name="proveedor"]:focus:hover,
    input[name="cliente"]:focus:hover,
    input[name="banco"]:focus:hover {
        cursor: text;
    }

    input[type="checkbox"] {
        display: none;
    }

    input[type="search"]:hover,
    input[type="search"]:focus {
        outline: none;
        background: none;
    }

    input[type="search"]:disabled,
    input[type="text"]:disabled,
    input[type="number"]:disabled,
    input[type="email"]:disabled,
    input[type="tel"]:disabled,
    input[type="date"]:disabled,
    input[type="time"]:disabled,
    input[type="password"]:disabled,
    textarea:disabled,
    input[name="proveedor"]:disabled,
    input[name="cliente"]:disabled,
    input[name="banco"]:disabled,
    select:disabled {
        pointer-events: none;
        
        &::placeholder {
            color: var(--on-background-disabled);
        }
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--on-background);
        -webkit-box-shadow: 0 0 0px 1000px var(--background) inset;
        box-shadow: none;
        border-width: 1px;
        border-style: solid;
        border-color: #2f2f2f;
        border-image: none;
    }

    button,
    input[type="submit"] {
        position: relative;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        border: none;
        background: none;
        text-transform: uppercase;
        font: var(--body2);
        color: var(--primary);
        transition: 0.15s ease-in;
        
        &:hover {
            cursor: pointer;
            background: var(--secondary-variant);
            transition: 0.15s ease-out;
        }
        
        &:focus {
            outline: none;
            background: var(--primary-variant);
        }

        &:disabled {
            cursor: default;
            background: none;
            color: var(--on-background-disabled);
        }
    }

    button[type="submit"],
    input[type="submit"] {
        color: var(--secondary);
    }

    button[type="reset"] {
        color: var(--error);
    }
`;

export default GlobalStyle;
