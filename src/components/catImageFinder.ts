const SUBREDDIT = "cats";
const LIMIT = 55;
const TAG = "Cat Picture - OC"
const API_URL = `https://www.reddit.com/r/${SUBREDDIT}/search.json?q=flair:"${TAG}"&restrict_sr=1&limit=${LIMIT}`;

async function getCatPictures() {
  console.log(`Cat images form r/${SUBREDDIT}...`);

  const catImageList: any[] = [];

  try {
    // 1. Send Request
    const response = await fetch(API_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9"
      },
    });

    if (!response.ok) {
      throw new Error(`Error occured: ${response.statusText}`);
    }

    const data = await response.json();

    // 2. Processing Data
    const posts = data.data.children;

    posts.forEach((post: any, index: number) => {
      const { url, post_hint } = post.data;
      if (post_hint === "image" || url.match(/\.(jpg|jpeg|png|gif)$/)) {
        //savingImages(url);
        catImageList.push(url);
      }
    });
  } catch (error) {
    console.error("Error occurd while trying to download the files :", error);
  }

  return catImageList;
}

export default getCatPictures;

// async function savingImages(url: string) {
//   try {
//     const response = await fetch(url, {
//       headers: { "User-Agent": "Mozilla/5.0..." } // Ide is kell a fejléc!
//     });
//     if (!response.ok) throw new Error("URL can't be fetched.");

//     // Kivágjuk a fájl nevét az URL végéről (pl. xyz.jpg)
//     const filename = url.split("/").pop(); 
    
//     await Bun.write("./images/" + filename, response);
//     console.log(`✅ Mentve: ${filename}`);
//   } catch (error) {
//     console.error("❌ Hiba a mentés során:", error);
//   }
// }