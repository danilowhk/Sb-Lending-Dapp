import styled from "styled-components";

export const Container = styled.div`
  margin-top: 1rem;
  background: white;
  text-align: center;
  padding-top: 1.5rem;
  color: var(--text-title);
  font-weight: 600;

  div {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 9rem;
    /* background:gray; */
    gap: 0.5rem;

    span {
      margin-left: 1rem;
      background: var(--background);
      padding: 2rem 5rem;
      font-size: 21px;
      border-radius: 0.5rem;
    }
  }
`;
