const SEARCH_QUERY = "cats";
const PUBLIC_IMGUR_CLIENT_ID = "546c25a59c58ad7";  //Public client side imgur API client id
const API_URL = `https://api.imgur.com/3/gallery/search/time/all/1?q=${SEARCH_QUERY}`;

async function getCatPictures() {
  console.log(`Cat images from Imgur (::: ${SEARCH_QUERY})...`);

  const catImageList: string[] = [];

  try {
    const response = await fetch(API_URL, {
      headers: {
        "Authorization": `Client-ID ${PUBLIC_IMGUR_CLIENT_ID}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`API fault: ${response.status} ${response.statusText}`);
    }

    const jsonResult = await response.json();
    const items = jsonResult.data;

    if (!items || !Array.isArray(items)) {
      console.log("There is no data ...");
      return catImageList;
    }

    items.forEach((item: any) => {
      if (item.is_album && item.images) {
        item.images.forEach((image: any) => {
          if (image.link && image.link.match(/\.(jpg|jpeg|png|gif)$/i)) {
            catImageList.push(image.link);
          }
        });
      } else {
        if (item.link && item.link.match(/\.(jpg|jpeg|png|gif)$/i)) {
          catImageList.push(item.link);
        }
      }
    });

  } catch (error) {
    console.error("Error occured while trzing to fetch the API (Imgur)", error);
  }

  console.log(`✅ Succes ${catImageList.length} piece`);
  return catImageList;
}

export default getCatPictures;