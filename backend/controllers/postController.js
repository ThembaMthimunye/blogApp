import { getDb } from "../connect.js";

export const allUser=async (req,res)=>
{
    let db = getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    res.json(data)
  } else {
    throw new Error("Data was not found")
  }
}