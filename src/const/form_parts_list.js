
/**
 * @typedef {Object} FormData
 * @property {string} name input などの name になる
 * @property {string} [label]
 * @property {string} component コンポーネント名
 * @property {{label:string,value:string|number}[]} [list] radio checkbox selectの選択肢
 */
/**
 * @typedef {Object} FormParts
 * @property {string} id form_parts を区別するID
 * @property {string} ttl_label 見出し文字列
 * @property {FormData[]} form_data_list form_data の配列
 */

/**
 * @type {FormParts[]}
 */
export default [
    {
        id:'hoge',
        ttl_label:'概要',
        form_data_list:[
            {
                name:'hoge1',
                label:'1行テキスト',
                component:'FormInputText',
                type:'text',
                placeholder: '入力してください',
                minlength: 2,
                maxlength: 8,
                required: true
            },
            {
                name: 'hoge9',
                label: 'メールアドレス',
                component:'FormInputText',
                type: 'text',
                placeholder: '入力してください',
                pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
                required: true
            },
            {
                name: 'hoge10',
                label: '電話番号',
                component:'FormInputText',
                type: 'text',
                placeholder: '00-0000-0000',
                pattern: '^\\d{2,4}-\\d{3,4}-\\d{3,4}$',
                required: true,
                err_msgs: {
                    pattern: '00-0000-0000のフォーマットで入力してください'
                }
            }
        ]
    },
    {
        id: 'fuga',
        ttl_label: '概要その２',
        form_data_list: [
            {
                label: 'ラジオボタン',
                name: 'hoge2',
                component:'FormInputRadio',
                list: [
                    {
                        label: '候補1',
                        value: 'radio1',
                    },
                    {
                        label: '候補2',
                        value: 'radio2',
                    },
                    {
                        label: '候補3',
                        value: 'radio3',
                    }
                ],
                required: true
            },
            {
                label: 'チェックボックス',
                name: 'hoge3',
                component:'FormInputCheckbox',
                list: [
                    {
                        label: '候補1',
                        value: 'checkbox1',
                    },
                    {
                        label: '候補2',
                        value: 'checkbox2',
                    },
                    {
                        label: '候補3',
                        value: 'checkbox3',
                    }
                ],
                required: true
            },
            {
                label: 'テキストエリア',
                name: 'hoge5',
                component:'FormTextarea',
                placeholder: '候補2を選択した場合は詳細を記入。\nよろしく',
                required: true,
                observe: [
                    {
                        name: 'hoge3',
                        changeCallback(observed_item) {
                            // this が observer の この item 自身。またここはアロー関数では動作しない
                            this.disabled = !(observed_item.value.includes('checkbox2'));
                        },
                        init: true
                    }
                ]
            },
            {
                label: 'プルダウン',
                name: 'hoge4',
                component:'FormSelect',
                list: [
                    {
                        label: '選択してください',
                        value: '',
                    },
                    {
                        label: '候補1',
                        value: 'select1',
                    },
                    {
                        label: '候補2',
                        value: 'select2',
                    },
                    {
                        label: '候補3',
                        value: 'select3',
                    }
                ],
                required: true
            },
            {
                label: 'Number',
                name: 'hoge6',
                component:'FormInputText',
                type: 'number',
                min: 3,
                max: 10,
                is_requied: true
            },
            {
                label: '日付',
                name: 'hoge7',
                component:'FormInputText',
                type: 'date',
                min: '2020-03-22',
                max: '2021-03-21',
                required: true,
                err_msgs: {
                    min: '__MIN__以降の日程を指定してください',
                    max: '__MAX__以前の日程を指定してください'
                }
            },
            {
                label: '時間',
                name: 'hoge8',
                component:'FormInputText',
                type: 'time',
                min: '08:00',
                max: '21:00',
                required: true,
                err_msgs: {
                    min: '__MIN__以降の時間を指定してください',
                    max: '__MAX__以前の時間を指定してください'
                }
            }
        ]
    },
];