import {Node} from "./RefferalStructure/ReferralStructure";

export const Example:Node = {
    name: 'EdnaRoberts',
    category: 'B',
    id: 1,
    list: [
        {
            name: 'SueHines',
            parent: 'EdnaRoberts',
            category: 'B',
            id: 2,
            list: [
                {
                    parent: 'SueHines',
                    name: 'SueHi',
                    category: 'B',
                    id: 3,
                },
                {
                    parent: 'SueHines',
                    name: 'SueHi',
                    category: 'B',
                    id: 4,
                },
                {
                    parent: 'SueHines',
                    name: 'SueHi',
                    category: 'B',
                    id: 5,
                }
            ]
        },
        {
            name: 'JaydenN',
            parent: 'EdnaRoberts',
            category: 'A',
            id: 6,
            list: [
                {
                    parent: 'JaydenN',
                    name: 'SueHi',
                    id: 7,
                    category: 'B',
                },
                {
                    parent: 'JaydenN',
                    name: 'SueHi',
                    id: 8,
                    category: 'B',
                },
                {
                    parent: 'JaydenN',
                    name: 'SueHi',
                    id: 9,
                    category: 'B',
                }
            ]
        },
        {
            name: 'EttaSoto',
            parent: 'EdnaRoberts',
            id: 10,
            category: 'A',
            list: [
                {
                    parent: 'EttaSoto',
                    name: 'SueHi',
                    id: 11,
                    category: 'B',
                },
                {
                    parent: 'EttaSoto',
                    name: 'SueHi',
                    id: 12,
                    category: 'B',
                },
                {
                    parent: 'EttaSoto',
                    name: 'SueHi',
                    id: 13,
                    category: 'B',
                }
            ]
        }
    ]
}

export const ResponseStructure = [
    {LOGIN: 'kevinche', PARENT: 'n1mber', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'dubsta', PARENT: 'n1mber', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon', PARENT: 'n1mber', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'kevinche1', PARENT: 'kevinche', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'kevinche2', PARENT: 'kevinche', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'kevinche3', PARENT: 'kevinche', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'dubsta1', PARENT: 'dubsta', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'dubsta2', PARENT: 'dubsta', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'dubsta3', PARENT: 'dubsta', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon1', PARENT: 'equilon', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon2', PARENT: 'equilon', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon3', PARENT: 'equilon', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'kevinche11', PARENT: 'kevinche1', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'kevinche12', PARENT: 'kevinche1', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon21', PARENT: 'equilon2', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon22', PARENT: 'equilon2', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon211', PARENT: 'equilon21', PERSONAL: 'true', CATEGORY: 'A'},
    {LOGIN: 'equilon212', PARENT: 'equilon21', PERSONAL: 'true', CATEGORY: 'A'},
]
