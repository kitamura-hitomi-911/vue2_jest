export default [
    {
        group_label:'概要',
        units:[
            {
                label: '1行テキスト',
                id: 'hoge',
                items: [
                    {
                        name: 'hoge1',
                        type: 'text',
                        value: '',
                        placeholder: '入力してください',
                        minlength: 2,
                        maxlength: 8,
                        is_requied: true
                    }

                ]
            },
            {
                label: 'ユニット１',
                id: 'cat1',
                items: [
                    {
                        label: 'メールアドレス',
                        name: 'hoge9',
                        type: 'text',
                        value: '',
                        placeholder: '入力してください',
                        pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
                        is_requied: true
                    },
                    {
                        label: '電話番号',
                        name: 'hoge10',
                        type: 'text',
                        value: '',
                        placeholder: '00-0000-0000',
                        pattern: '^\\d{2,4}-\\d{3,4}-\\d{3,4}$',
                        is_requied: true,
                        err_msg_txt: {
                            pattern: '00-0000-0000のフォーマットで入力してください'
                        }
                    }

                ]
            },
            {
                label: 'カテゴリ2',
                id: 'cat2',
                items: [
                    {
                        label: 'ラジオボタン',
                        name: 'hoge2',
                        type: 'radio',
                        value: '',
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
                        is_requied: true
                    }
                ]
            },
            {
                label: 'カテゴリ3',
                id: 'cat3',
                items: [
                    {
                        label: 'チェックボックス',
                        name: 'hoge3',
                        type: 'checkbox',
                        value: [],
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
                        is_requied: true
                    },
                    {
                        label: 'テキストエリア',
                        name: 'hoge5',
                        type: 'textarea',
                        value: '',
                        placeholder: '候補2を選択した場合は詳細を記入。\nよろしく',
                        is_requied: true,
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
                    }
                ]
            },
        ]
    },
    {
        group_label:'日時・場所',
        units:    [
            {
                label: 'カテゴリ4',
                id: 'cat4',
                items: [
                    {
                        label: 'プルダウン',
                        name: 'hoge4',
                        type: 'select',
                        value: '',
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
                        is_requied: true
                    },
                    {
                        label: 'Number',
                        name: 'hoge6',
                        type: 'number',
                        value: '',
                        min: 3,
                        max: 10,
                        is_requied: true
                    },
                    {
                        label: '日付',
                        name: 'hoge7',
                        type: 'date',
                        value: '',
                        min: '2020-03-22',
                        max: '2021-03-21',
                        is_requied: true,
                        err_msg_txt: {
                            min: '__MIN__以降の日程を指定してください',
                            max: '__MAX__以前の日程を指定してください'
                        }
                    },
                    {
                        label: '時間',
                        name: 'hoge8',
                        type: 'time',
                        value: '',
                        min: '08:00',
                        max: '21:00',
                        is_requied: true,
                        err_msg_txt: {
                            min: '__MIN__以降の時間を指定してください',
                            max: '__MAX__以前の時間を指定してください'
                        }
                    }
                ]
            }
        ]
    }
];