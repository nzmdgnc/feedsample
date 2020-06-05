import * as React from 'react';
import { keyframes } from '@emotion/core';
import { styled, IWebchatTheme } from '../../style';
import tinycolor from 'tinycolor2';

const bounce = (theme: IWebchatTheme) => keyframes({
    '0%': {
        transform: 'translateY(0px)',
        backgroundColor: tinycolor(theme.primaryContrastColor).setAlpha(.54).toString()
    },
    '28%': {
        transform: `translateY(-${theme.unitSize}px)`,
        backgroundColor: tinycolor(theme.primaryContrastColor).setAlpha(.8).toString()
    },
    '44%': {
        transform: 'translateY(0px)',
        backgroundColor: tinycolor(theme.primaryContrastColor).setAlpha(.8).toString()
    }
});

const Container = styled.div(({ theme }) => ({
    paddingTop: theme.unitSize,
    whiteSpace: "nowrap",
    flexBasis: theme.unitSize * 5,
    height: 11
}))

const Dot = styled.div(({ theme }) => ({
    animation: `${bounce(theme)} 1.5s infinite ease-out`,
    borderRadius: theme.unitSize / 2,
    display: 'inline-block',
    height: theme.unitSize,
    width: theme.unitSize,
    marginRight: theme.unitSize / 2,
    backgroundColor: tinycolor(theme.primaryContrastColor).setAlpha(.24).toString(),

    '&:nth-of-type(1)': {
        animationDelay: '200ms'
    },

    '&:nth-of-type(2)': {
        animationDelay: '300ms'
    },

    '&:nth-of-type(3)': {
        animationDelay: '400ms'
    },
}));

export default () => (
    <Container>
        <Dot />
        <Dot />
        <Dot />
    </Container>
)