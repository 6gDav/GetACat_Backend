# GetACat Backend

This is the backend of [GetACat](). I built this to provide data for the main website and external clients. <br>
This backend service (*BaaS*) can be used as an independent service from the main website, meaning you can use it outside of the primary client application.
*(I primarily built this for portfolio purposes, not for daily production use.)*

### Click here 👉 [to navigate to "How to Access"](#-how-to-access) <br>
### Click here 👉 [to navigate to "What's Inside"](#-whats-inside) <br>

## 🚶 How to Access

Here's the link 👉: **https://getacat-backend.onrender.com**

I'm hosting this with [Render.com](https://render.com/), so the API URL will be built like *https://getacat-backend.onrender.com* followed by the route path.

> ❗️ *It can happen that the fetching is slow at first because I use the free version of [Render.com](https://render.com/). If the server is inactive for 15 minutes, it goes into sleep mode.*

### 🚏 Here are the route endpoints.

The main route. <br>
> ❗️ *You can't access anything here because I didn't set an endpoint for this route.*
```
https://getacat-backend.onrender.com
```

<hr>

Get all cat images.
```
https://getacat-backend.onrender.com/get-a-cat-image
```

<hr>

Cat details by name. <br>
*Replace `:name` with the desired cat breed.*
```
https://getacat-backend.onrender.com/get-a-cat-info/:name
```

<hr>

Returns all breeds.
```
https://getacat-backend.onrender.com/get-a-cat-info-datail/get-all-names/
```

<hr>

Returns a specific property of a cat. <br>
*Replace `:name` with the desired cat breed.* <br>
*Replace `:detail` with the desired property.*
```
https://getacat-backend.onrender.com/get-a-cat-info-datail/:name/:datail
```
<hr>

> 🎯 I used a rate limiter on every API endpoint. The intended client stores this data in SessionStorage.

## 📦 What's Inside

My goal was to build a backend for my GetACat website client.
I chose [Hono](https://hono.dev/) and [Bun](https://bun.com/) because I wanted to test and practise these frameworks.

## 📚 Tech Stack

*  Bun:
    * TypeScript
    * Hono
    * hono-rate-limiter

## 🐈 About the Images

### 🖼 How Cat Images are Fetched (Fallback Strategy)

Originally, this project relied on **Reddit's** open URL-based solution (appending `.json` to subreddits and filtering with URL parameters). However, due to Reddit's API policy changes, this method was deprecated.

To keep the application running smoothly, I implemented a robust fallback strategy:
1. **Primary Source (Imgur API):** The app first attempts to fetch images using Imgur's public client token. 
2. **Fallback Source (TheCatAPI):** If the Imgur fetch fails, the backend automatically switches to TheCatAPI. To ensure UI consistency, the fallback is configured to return exactly 66 cat images, matching Imgur's default response payload size.

## 🌳 File tree
```
├── src 
│   ├── components
│   │   ├── images
│   │   │   ├── catImageFinder.ts
│   │   │   └── catImageFinder2.ts
│   │   ├── routes
│   │   │   ├── catImages.ts
│   │   │   ├── catInfo.ts
│   │   │   └── catInfoDetail.ts
│   │   ├── cats.json
│   │   └── rateLimiter.ts 
│   └── index.ts
├── .dockerignore
├── .gitignore
├── Dockerfile
├── README.md
├── bun.lock
├── package.json
└── tsconfig.json 
```