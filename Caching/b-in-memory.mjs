"use strict";

import express from "express";
import fetch from "node-fetch";
import { createClient } from "redis";
import { promisify } from "util";

const app = express();

const URL = "https://disease.sh/v3/covid-19/all";
const PORT = 3000;

const client = createClient();
client.connect();

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

const gets = promisify(client.get).bind(client);

async function getCovid19Stats() {
  const response = await fetch(URL);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}

app.get("/covid", async (req, res) => {
  let stats = null;

  try {
    stats = await client.get("covidStats");
    if (stats) {
      console.log("Fetching data from Redis");
      console.log(JSON.parse(stats));
      res.status(200).send(JSON.parse(stats));
      return;
    }
  } catch (err) {
    console.log(err);
  }

  try {
    console.log("Fetching data from API...");
    stats = await getCovid19Stats();
    client.setEx("covidStats", 10, JSON.stringify(stats));
    res.status(200).send(stats);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
