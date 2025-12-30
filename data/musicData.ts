
import { Track } from '../types';

const COMMON_COVER = "https://free.picui.cn/free/2025/12/15/694012a94d57f.png";

export const musicTracks: Track[] = [
  {
    id: 'main_theme',
    title: 'TIMELINE MAIN',
    artist: 'NOVA_OST',
    cover: COMMON_COVER,
    sources: [
        "https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/i5OIw3dk1rte",
        "https://cik07-cos.7moor-fs2.com/im/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/fd991fcc1f737774/main.mp3"
    ],
    description: {
      'zh-CN': '主界面环境音。那来自界外的客人，于静默中播放这早已发生过的故事。',
      'zh-TW': '主界面環境音。那來自界外的客人，於靜默中播放這早已發生過的故事。',
      'en': 'Main Interface BGM. The guest from beyond, playing this long-concluded story in silence.'
    }
  },
  {
    id: 'main_theme_sp',
    title: 'TIMELINE MAIN (sp.)',
    artist: 'NOVA_OST',
    cover: COMMON_COVER,
    sources: [
        "https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/ic4Vq3dq4t1c"
    ],
    description: {
      'zh-CN': '主界面环境音变奏。当鉴赏者闭上双眼，数据流的深处传来了更深层的回响。',
      'zh-TW': '主界面環境音變奏。當鑑賞者閉上雙眼，數據流的深處傳來了更深層的迴響。',
      'en': 'Main Interface BGM Variation. When the observer closes their eyes, a deeper resonance echoes from the depths of the data stream.'
    }
  },
  {
    id: 'daily_life',
    title: 'TIMELINE DAILY',
    artist: 'NOVA_OST',
    cover: COMMON_COVER,
    sources: [
        "https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/i5TeC3dk1q1a",
        "https://cik07-cos.7moor-fs2.com/im/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/6f611d085fec7cfe/daily.mp3"
    ],
    description: {
      'zh-CN': '日常片段。在那些不用面对工作的日子里，友情与吐槽是最好的调剂。',
      'zh-TW': '日常片段。在那些不用面對上工的日子裡，友情與吐槽是最好的調劑。',
      'en': 'Daily fragments. On days without facing works, friendship and banter are the best remedy.'
    }
  },
  {
    id: 'daily_life_sp',
    title: 'TIMELINE Daily (sp.)',
    artist: 'NOVA_OST',
    cover: COMMON_COVER,
    sources: [
        "https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/icrY03dq4swh"
    ],
    description: {
      'zh-CN': '日常片段变奏。或许在另一个平行世界，这样的轻松时光能持续得更久一些。',
      'zh-TW': '日常片段變奏。或許在另一個平行世界，這樣的輕鬆時光能持續得更久一些。',
      'en': 'Daily fragments Variation. Perhaps in another parallel world, such relaxing times could last a little longer.'
    }
  },
  {
    id: 'variable',
    title: 'Byaki.',
    artist: 'NOVA_OST',
    cover: COMMON_COVER,
    sources: [
        "https://cik07-cos.7moor-fs2.com/im/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/e49d774395d5381a/Byaki..mp3",
        "https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/iCU593dnamda"
    ],
    description: {
      'zh-CN': '被保留的变量。当‘我’需要被理解时，她会以白栖的方式存在。',
      'zh-TW': '被保留的變量。當「我」需要被理解時，她會以白棲的方式存在。',
      'en': 'The Preserved Variable. When "I" need to be understood, she exists as Byaki.'
    }
  },
  {
    id: 'static_menu',
    title: 'Static Menu（静止之章）',
    artist: 'NOVA_OST',
    cover: COMMON_COVER,
    sources: [
        "https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/i09IZ3effnne"
    ],
    description: {
      'zh-CN': '系统待机时的背景音。在抉择与开始之间，是一片宁静的电子荒原。',
      'zh-TW': '系統待機時的背景音。在抉擇與開始之間，是一片寧靜的電子荒原。',
      'en': 'Background noise during system standby. Between choice and commencement lies a quiet electronic wasteland.'
    }
  },
  {
    id: 'zero_point',
    title: 'Zero Point',
    artist: 'NOVA_OST',
    cover: COMMON_COVER,
    sources: [
        "https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/i5y9D3ev5qni"
    ],
    description: {
      'zh-CN': '零点章节的背景音乐。这是她的责任。',
      'zh-TW': '零點章節的背景音樂。這是她的責任。',
      'en': 'Background music for the Zero Point chapter. This is her responsibility.'
    }
  }
];
