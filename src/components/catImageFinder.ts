const SUBREDDIT = "cats";
const LIMIT = 55;
const TAG = "Cat Picture - OC"
const API_URL = `https://www.reddit.com/r/${SUBREDDIT}/search.json?q=flair:"${TAG}"&restrict_sr=1&limit=${LIMIT}`;

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
      // if (post_hint === "image" || url.match(/\.(jpg|jpeg|png|gif)$/)) 

      //kell a tobbi kép tipus 

      if (post_hint === "image" || url.match(/\.(jpeg)$/)) {
        console.log(`\n[${index + 1}] ${title}`);
        console.log(`🔗 Link: ${url}`);
        savingImages(url);
        catImageList.push(url);
      }
    });
  } catch (error) {
    console.error("❌ Hiba a letöltés során:", error);
  }

  return catImageList;
}

export default getCatPictures;

async function savingImages(url: string)
{
  try {
    const response = await fetch(url);

    if (!response.ok) throw Error("URL can't be fatched.");

    await Bun.write("./images/" + url + ".jpeg", response);
  }
  catch (error) {
    console.error("❌ Hiba a mentés során:", error);
  }
}