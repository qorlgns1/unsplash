export interface Nav {
  title: string
  link: string
}

export const NAV_LIST: Nav[][] = [
  [
    {
      title: '보도/편집 전용',
      link: '/',
    },
    {
      title: '팔로잉',
      link: '/following',
    },
    {
      title: 'Will Photo+',
      link: '/will-photo-plus',
    },
  ],
  [
    {
      title: '단색',
      link: '/colors',
    },
    {
      title: '배경 화면',
      link: '/wallpapers',
    },
    {
      title: '3D 렌더링',
      link: '/3d-rendering',
    },
    {
      title: '자연',
      link: '/nature',
    },
    {
      title: '텍스처 및 패턴',
      link: '/textures-and-patterns',
    },
    {
      title: '건축 및 인테리어',
      link: '/architecture-and-interiors',
    },
    {
      title: '필름',
      link: '/film',
    },
    {
      title: '거리 사진',
      link: '/street-photography',
    },
    {
      title: '실험적인',
      link: '/experimental',
    },
  ],
]

export const BOOKMARK_NAV_LIST: Nav[] = [
  {
    title: '사진',
    link: '/bookmark/photo',
  },
  {
    title: '좋아요',
    link: '/bookmark/like',
  },
  {
    title: '컬렉션',
    link: '/bookmark/collection',
  },
  {
    title: '통계',
    link: '/bookmark/stats',
  },
]
