import * as React from 'react';
import { InputComponentProps } from '../../common/interfaces/input-plugin';
import Toolbar from '../../webchat-ui/components/presentational/Toolbar';
import Button from '../../webchat-ui/components/presentational/Button';
import { styled } from '../../webchat-ui/style';

const GetStartedButton = styled(Button)(({ theme }) => ({
    marginBottom: theme.unitSize * 2,
    flexGrow: 1
}));

export default ({ onSendMessage, config }: InputComponentProps) => (
    <Toolbar>
        <GetStartedButton
            onClick={() => onSendMessage(config.settings.getStartedPayload, null, { label: config.settings.getStartedText })}
            color='primary'
        >
            {config.settings.getStartedButtonText || config.settings.getStartedText}
        </GetStartedButton>
    </Toolbar>
)