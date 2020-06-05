import { IFBMButton } from "./Button.interface";
import { IFBMDefaultAction } from "./Action.interface";

export interface IFBMListTemplatePayload {
    template_type: 'list';
    top_element_style: 'large' | 'compact';
    elements: IFBMListTemplateElement[];
    buttons: IFBMButton[]
}

export interface IFBMListTemplateElement {
    title: string;
    subtitle: string;
    image_url: string;
    buttons: IFBMButton[];
    default_action: IFBMDefaultAction;
}