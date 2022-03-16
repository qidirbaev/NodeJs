
import express from "express";
import fetch from "node-fetch";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 600 });

const URL = "https://jsonplaceholder.typicode.com/posts";
const STD_TTL = 100;
const PORT_NUMBER = 3000;

async function getPosts() {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

const app = express();
app.get("/posts", async (req, res) => {
  try {
    let posts = myCache.get("allPosts");
    if (posts == null) {
      console.log("Fetching data from API...");
      posts = await getPosts();
      myCache.set("allPosts", posts, STD_TTL);
    } else {
      console.log("Data fetched from cache");
      console.dir({ myCache });
    }
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server listening on http://localhost:${PORT_NUMBER}`);
});
