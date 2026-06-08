const LIMIT = 66;
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=${LIMIT}`;
const BACKEND_NAME = "TheCatAPI"

async function getCatPictures2(): Promise<string[]> {
    console.log(`Cat images from ${BACKEND_NAME}.`);

    const catImageList: string[] = [];

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API fault: ${response.status} ${response.statusText}`);
        }

        const jsonResult = await response.json(); 

        if (!jsonResult || !Array.isArray(jsonResult)) {
            console.log("There is no data ...");
            return catImageList;
        }
        
        jsonResult.forEach((item: any) => {
            if (item.url) {
                catImageList.push(item.url);
            }
        });

    } catch (error) {
        console.error(`❌ Error occured while trying to fetch the API (${BACKEND_NAME}).`, error);
    }

    console.log(`✅ Success ${catImageList.length} pieces.`);
    return catImageList;
}

export default getCatPictures2;