export const CONTACTER_LEFT_THEAD=[
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
    },
    {
        header: '날짜',
        accessor: 'date'
    }
]

export const CONTACTER_RIGHT_THEAD=[
    {
        header: '성별',
        accessor: 'gender'
    },
    {
        header: '접촉 확진자',
        accessor: 'contacters'
    },
    {
        header: '방문지점수',
        accessor: 'nodes'
    },
    {
        header: '날짜',
        accessor: 'date'
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

export const API_BASE_URL = 'http://203.250.32.29:8083'

export const SPECIAL_LOC = {
    '서울특별시': 'seoul',
    '인천광역시': 'incheon',
    "경기도": 'gyeongido',
    "강원도": 'gangwondo',
    "충청북도": 'chungcheongbukdo',
    "충청남도": 'chungcheongnamdo',
    "세종특별자치시": 'sejong',
    "대전광역시": 'daejeon',
    "전라북도": 'jeonrabukdo',
    "전라남도": 'jeonranamdo',
    "광주광역시": 'gwangju',
    "경상남도": 'gyeongsangnamdo',
    "경상북도": 'gyeongsangbukdo',
    "부산광역시": 'busan',
    "울산광역시": 'ulsan',
    "대구광역시": 'daegu',
    "제주특별자치도": 'jeju'
};

export const PAGE_INDEX_STANDARD = 35