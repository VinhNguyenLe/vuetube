export interface ISidebarMenu {
  id?: number;
  title?: string;
  icon?: any;
  query?: string;
}

export interface ITabsMenu {
  id?: number;
  title?: string;
  icon?: any;
  query?: string;
}

export interface IRelatedVideo {
  thumbnail?: string;
  title?: string;
  videoId?: string;
  channelName?: string;
  view?: string | number;
  publishedAt?: string | Date;
}

export interface IVideoDetail {
  channelId?: string;
  channelTitle?: string;
  description?: string;
  title?: string;
  tags?: string[];
  commentCount?: string | number;
  likeCount?: string | number;
  viewCount?: string | number;
  publishedAt?: string | Date;
}

export interface IVideoComment {
  authorChannelId?: string;
  authorDisplayName?: string;
  authorProfileImageUrl?: string;
  likeCount?: number | string;
  publishedAt?: string | Date;
  textDisplay?: string;
  textOriginal?: string;
}

export interface IStore {
  isCollapse: boolean;
  searchInput?: string;
  feedData?: any[];
  query?: string;
  isLoading?: boolean;
  sidebarMenu?: ISidebarMenu[];
  tabsMenu?: ITabsMenu[];
  relatedVideos?: IRelatedVideo[];
  videoDetail?: IVideoDetail;
  videoComment?: IVideoComment[];
  videoName?: string;
}

export interface IYoutube {
  width: number;
  height: number;
  autoplay?: number; // default value : 0
  videoid: string;
  loop?: number; // default value : 0
  controls?: number; //default value: 0
  modestbranding?: number;
}
