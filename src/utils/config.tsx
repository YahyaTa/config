export const FUNDS_COLUMNS: any = [
    { property: '' },
    { property: 'unit_linked_fund:code' },
    { property: 'unit_linked_fund:label' },
    { property: 'unit_linked_fund:category' },
    { property: 'unit_linked_fund:s_r_r_i' }
];
export const FUNDS_CRITERIA_LIST = {
    'unit_linked_fund:code': {
        searchOn: 'unit_linked_fund:code',
        type: 'text',
        value: undefined
    },

    'unit_linked_fund:label': {
        searchOn: 'unit_linked_fund:label',
        type: 'text',
        value: undefined
    },
    'unit_linked_fund:i_s_i_n': {
        searchOn: 'unit_linked_fund:i_s_i_n',
        type: 'text',
        value: undefined
    },
    'unit_linked_fund:category': {
        searchOn: 'unit_linked_fund:category',
        type: 'text',
        value: undefined
    },
    'unit_linked_fund:s_r_r_i': {
        searchOn: 'unit_linked_fund:s_r_r_i',
        type: 'text',
        value: undefined
    },
    'interest_fund:code': {
        searchOn: 'interest_fund:code',
        type: 'text',
        value: undefined
    },
    'interest_fund:asset_category': {
        searchOn: 'interest_fund:asset_category',
        type: 'text',
        value: undefined
    },
    'unit_linked_fund:asset_category': {
        searchOn: 'unit_linked_fund:asset_category',
        type: 'text',
        value: undefined
    }
};
