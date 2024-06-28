'use server'

import { signOut } from "@/auth";

export async function signout(): Promise<boolean> {
  try {
    console.log("try signout");

    await signOut({ redirect: false });

    console.log("singout successful");
    return true;
  } catch (error) {
    console.error("Singout error:", error);
    return false;
  }
}