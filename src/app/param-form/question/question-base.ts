export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: any;
    options: any;
    //
    tabGroup: number;
    syncValidators: any;
    asyncValidators: any;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        //
        tabGroup?: number,
        syncValidators?: string,
        asyncValidators?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = null;
        this.options = null;
        //
        this.tabGroup = options.tabGroup || null;
        this.syncValidators = options.syncValidators || null;
        this.asyncValidators = options.asyncValidators || null;
    }
}
