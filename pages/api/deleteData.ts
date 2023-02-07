import { NextApiResponse, NextApiRequest } from "next";
import { deleteUsers } from "./auth/[...nextauth]";

export default async function deleteData(req:NextApiRequest, res:NextApiResponse) {
  const d = await deleteUsers();

  res.status(200).redirect(307, '/server');
};