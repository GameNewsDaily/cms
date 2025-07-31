// 若 fetch() 在 file 協定下無法載入 JSON，可使用內嵌備用資料
window.DEFAULT_POSTS = [
  {
    title: '《博德之門3》：瓦羅技能與招式指南',
    slug: 'baldurs-gate-3-varric-guide',
    date: '2025-07-27',
    category: 'RPG',
    excerpt:
      '瓦羅是《博德之門3》中擁有能力強大的角色。他能替隊友承受受傷害並具備特殊魔法攻擊，本文詳述介紹其技能和使用心得。',
    image: 'https://picsum.photos/600/400?gaming=1',
    popular: true,
  },
  {
    title: '《浪人崛起》遊戲評測',
    slug: 'ronin-rise-review',
    date: '2025-07-26',
    category: '動作冒險',
    excerpt:
      '《浪人崛起》是一款讓人期待已久的武士風格動作冒險遊戲。本篇將深入分析遊戲的畫面、戰鬥系統與整體體驗。',
    image: 'https://picsum.photos/600/400?gaming=2',
    popular: false,
  },
  {
    title: '《策略王者》發售日公開，預購開始',
    slug: 'strategy-king-release-date',
    date: '2025-07-24',
    category: '策略',
    excerpt:
      '《策略王者》終於公布發售日期與預購資訊，本作以宏大的世界觀與深度策略玩法讓玩家期待不已。',
    image: 'https://picsum.photos/600/400?gaming=3',
    popular: true,
  },
];

// 讀取 posts.json 並動態生成文章列表和熱門文章
async function loadPosts() {
  try {
    let posts = [];
    try {
      const response = await fetch('./posts.json');
      posts = await response.json();
    } catch (err) {
      // 如果透過 file:// 讀取失敗，可使用內建資料
      posts = window.DEFAULT_POSTS || [];
    }
    const postsContainer = document.querySelector('.posts');
    const popularList = document.getElementById('popular-posts-list');

    posts.forEach((post) => {
      // 建立文章卡片元素
      const card = document.createElement('article');
      card.classList.add('post-card');
      card.setAttribute('data-category', post.category);
      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image" />
        <div class="post-content">
          <h3 class="post-title">${post.title}</h3>
          <div class="post-meta">${post.date} | ${post.category}</div>
          <p class="post-excerpt">${post.excerpt}</p>
          <a href="#" class="btn btn-primary">閱讀全文</a>
        </div>
      `;
      postsContainer.appendChild(card);

      // 如果是熱門文章，加入側邊欄列表
      if (post.popular) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = post.title;
        li.appendChild(link);
        popularList.appendChild(li);
      }
    });
  } catch (error) {
    console.error('載入文章失敗', error);
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', loadPosts);