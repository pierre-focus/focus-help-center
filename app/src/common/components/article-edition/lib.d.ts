declare module 'remarkable' {
    const r: any;
    export = r;
}

declare module 'react-simple-markdown-editor' {
    import {Component} from 'react';
    export class SimpleMarkdownEditor extends Component<any, any> {}
}
