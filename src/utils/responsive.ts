import { css, CSSObject } from "styled-components";

export const sm = (props: CSSObject | TemplateStringsArray) => {
  return css`
    @media (max-width: 576px) {
      ${props}
    }
  `;
};

export const md = (props: CSSObject | TemplateStringsArray) => {
  return css`
    @media (max-width: 768px) {
      ${props}
    }
  `;
};
