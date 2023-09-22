import { Box, Container, styled } from "@mui/material";

export const BankContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
`;

export const Form = styled(Box)`
    display: flex;
    flex-direction: column;
    background-color: white;
    gap: 0.75rem;
    align-items: center;
    border-radius: 0.5rem;
    padding: 2rem;
`;