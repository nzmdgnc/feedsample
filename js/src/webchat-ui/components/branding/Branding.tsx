import React, { memo } from 'react';
import { styled } from '../../style';
import CognigyLogo from '../../assets/cognigy_logo.svg';
import tinycolor from "tinycolor2"

const Link = styled.a(({ theme }) => ({
    alignItems: "flex-end",
    color: theme.greyWeakColor,
    display: "flex",
    fontSize: theme.unitSize * 1.375,
    justifyContent: "center",
    lineHeight: 1,
    marginTop: 'auto',
    padding: theme.unitSize * 2,
    paddingBottom: 0,
    textAlign: 'center',
    textDecoration: 'none',
}));

const Logo = styled(CognigyLogo)(({ theme }) => ({
    fill: theme.greyWeakColor,
    height: 11,
    width: 80,
    marginLeft: 3,
    opacity: .9
}));

const URL = 'https://cognigy.com/';

const Branding = () => (
    <Link href={URL} target="_blank">
        <span>Powered by</span>
        <Logo />
    </Link>
);

export default memo(Branding, () => true);
