import React from 'react';
import { Global, css } from '@emotion/react';

const styles = css`
  html,
  body {
    min-height: 100%;
    padding: 0;
    margin: 0;
  }

  @supports (--custom: property) and (aspect-ratio: 1) {
    [style*='--aspect-ratio'] {
      aspect-ratio: var(--aspect-ratio);
    }
  }

  @supports (not (aspect-ratio: 1)) and (--custom: property) {
    [style*='--aspect-ratio'] {
      position: relative;
    }

    [style*='--aspect-ratio']::before {
      content: '';
      display: block;
      padding-bottom: calc(100% / (var(--aspect-ratio)));
    }

    [style*='--aspect-ratio'] > :first-child {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
`;

export function GlobalStyles() {
  return <Global styles={styles} />;
}
