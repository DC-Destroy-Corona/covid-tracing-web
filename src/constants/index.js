export const CONTACTER_THEAD=[
    {
        header: '식별번호',
        accessor: 'idx'
    },
    {
        header: '성별',
        accessor: 'gender'
    },
    {
        header: '접촉자수',
        accessor: 'contacters'
    },
    {
        header: '방문지점수',
        accessor: 'nodes'
    }
]

export const DEFAULT_MAP_OPTION={
    center: {
        latitude: 523951.25,
        longitude: 1085073.75
    },
    level: 12
}

export const MAP_FOCUS_LEVEL = 2

export const SIDEBAR_OPT = {
    foldTrue: 44,
    foldFalse: 309 
}

export const MARKER_OPT = {
    imageSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
    imageSize: {
        x: 36,
        y: 37
    },
    imgOptions: {
        spriteSize: {
            x: 36,
            y: 691
        },
        spriteOrigin: {
            x: 0,
            y: idx => (idx*46)+10
        },
        offset: {
            x: 13,
            y: 37
        }
    }
}