export interface FormElements {
    type: 'text' | 'date' | 'multi' | 'media';
    lable: string;
    list: [
        {
            type: string;
            label: string;
            subLabel: string;
        }
    ];
}