import { css, CSSObject } from "styled-components";

type MediaQueryProps = CSSObject | TemplateStringsArray | ((props: any) => CSSObject);

export const sm = (props: MediaQueryProps) => {
  return css`
    @media (max-width: 576px) {
      ${typeof props === "function" ? css(props) : props}
    }
  `;
};

export const md = (props: MediaQueryProps) => {
  return css`
    @media (max-width: 768px) {
      ${typeof props === "function" ? css(props) : props}
    }
  `;
};

export const lg = (props: MediaQueryProps) => {
  return css`
    @media (max-width: 992px) {
      ${typeof props === "function" ? css(props) : props}
    }
  `;
};
