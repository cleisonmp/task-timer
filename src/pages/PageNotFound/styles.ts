import styled from 'styled-components'

export const PageContainer = styled.div`
  overflow: auto;
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  div {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 1.5rem;
  }
`
