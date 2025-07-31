
async function fetchPosts() {
  const postList = document.getElementById("posts");

  const res = await fetch("https://api.github.com/repos/GameNewsDaily/cms/contents/posts");
  const files = await res.json();

  const htmlFiles = files.filter(file => file.name.endsWith(".html"));

  const posts = await Promise.all(htmlFiles.map(async (file) => {
    const raw = await fetch(file.download_url);
    const text = await raw.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const title = doc.querySelector("h1")?.innerText || "無標題";
    const meta = doc.querySelector("p.meta")?.innerText || "";
    const [date, category] = meta.split("|").map(t => t.trim());
    const excerpt = doc.querySelectorAll("p")[1]?.innerText || "";

    return { title, date, category, excerpt, slug: file.name.replace(".html", "") };
  }));

  posts.sort((a, b) => b.date.localeCompare(a.date));

  posts.forEach(post => {
    const el = document.createElement("div");
    el.innerHTML = `
      <h2><a href="posts/${post.slug}.html">${post.title}</a></h2>
      <p>${post.date} | ${post.category}</p>
      <p>${post.excerpt}</p>
      <hr/>
    `;
    postList.appendChild(el);
  });
}
fetchPosts();
