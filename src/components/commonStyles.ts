import styled from "@emotion/styled";

export const ModalBaseStyled = styled.div`
  padding: 1rem;
  & > * {
    flex-basis: 100%;
  }
  & > .action-buttons {
    flex-basis: 10%;
  }
`;

export const PageTitle = styled.h2`
  text-transform: capitalize;
  margin-bottom: 5rem;
  font-weight: 400;
  font-size: 2.5rem;
`;
