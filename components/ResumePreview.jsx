import React from "react";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";

export default function ResumePreview({ data, template = 'template1', font, color, pagePadding, sectionSpacing, id, h2Size, h3Size, h2Padding, h3Padding, h2Color, h3Color, pSize, pPadding, pColor, nameSize, titleSize, headerSpacing, sectionOrder }) {
    const props = { data, font, color, pagePadding, sectionSpacing, id, h2Size, h3Size, h2Padding, h3Padding, h2Color, h3Color, pSize, pPadding, pColor, nameSize, titleSize, headerSpacing, sectionOrder };
    switch (template) {
        case 'template2':
            return <Template2 {...props} />;
        case 'template3':
            return <Template3 {...props} />;
        case 'template4':
            return <Template4 {...props} />;
        case 'template5':
            return <Template5 {...props} />;
        case 'template1':
        default:
            return <Template1 {...props} />;
    }
}
