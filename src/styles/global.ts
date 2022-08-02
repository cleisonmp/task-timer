import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle` 
  html {
      font-size: 87.5%;
   }
  @media (min-width: 768px) {
    html {
      font-size: 100%;
    }
  }
  * {
    margin: 0;
    padding: 0; 
    box-sizing: border-box;  
  }
  :focus{
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }
  body {
    background-color: ${(props) => props.theme['gray-900']};    
    -webkit-font-smoothing: antialiased;
  }
  body, input, textarea, button, a{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: ${(props) => props.theme['gray-100']};    
  } 
  

`
