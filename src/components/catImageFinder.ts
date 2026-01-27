const SUBREDDIT = "cats";
const LIMIT = 10;
const API_URL = `https://www.reddit.com/r/${SUBREDDIT}/hot.json?limit=${LIMIT}`;

async function getCatPictures() {
  console.log(`🐱 Cicas képek keresése a r/${SUBREDDIT} subredditen...`);

  const catImageList: any[] = [];

  try {
    // 1. Kérés küldése
    const response = await fetch(API_URL, {
      headers: {
        "User-Agent": "Bun:CatCrawler:v1.0 (by /u/reddit-user)",
      },
    });

    if (!response.ok) {
      throw new Error(`Hiba történt: ${response.statusText}`);
    }

    const data = await response.json();

    // 2. Adatok feldolgozása
    const posts = data.data.children;

    posts.forEach((post: any, index: number) => {
      const { title, url, post_hint } = post.data;

      // Csak olyan posztokat nézünk, amik tényleg képek
      if (post_hint === "image" || url.match(/\.(jpg|jpeg|png|gif)$/)) {

        console.log(`\n[${index + 1}] ${title}`);
        console.log(`🔗 Link: ${url}`);
        catImageList.push(url);
      }
    });
  } catch (error) {
    console.error("❌ Hiba a letöltés során:", error);
  }

  return catImageList;
}

export default getCatPictures;