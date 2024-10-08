require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const vercelEdge = require("@vercel/edge-config");

// console.log(process.env.ANOTHER_EDGE_CONFIG);
// const edgeConfig = vercelEdge.createClient(process.env.ANOTHER_EDGE_CONFIG);

// const filePath = path.join("/tmp/", "counter.json");

// const readCounter = () => {
//   try {
//     const data = fs.readFileSync(filePath, "utf8");
//     const json = JSON.parse(data);
//     return json.count;
//   } catch (error) {
//     console.error("Error reading counter file:", error);
//     return 0;
//   }
// };

// const writeCounter = (count) => {
//   try {
//     const json = { count };
//     fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
//   } catch (error) {
//     console.error("Error writing counter file:", error);
//   }
// };

router.get("/", async (req, res) => {
  const count = await vercelEdge.get("counter");
  console.log(count);
  res.json({ count });
});

router.post("/increment", async (req, res) => {
  try {
    let count = await vercelEdge.get("counter");
    console.log(process.env.API_KEY_TOKEN + " " + process.env.CLIENT_ID);
    let newCount = count + 1;
    const updateEdgeConfig = await fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.CLIENT_ID}/items`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              operation: "update",
              key: "counter",
              value: newCount,
            },
          ],
        }),
      }
    );
    const result = await updateEdgeConfig.json();
    console.log(result);
    count++;
    res.json({ count });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
