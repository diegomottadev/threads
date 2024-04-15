import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  try {
    // Establish database connection
    connectToDB();
    // Update user document

    try {
      const user = await User.findOne({ id: userId });
      if (user) {
        // El usuario fue encontrado, puedes hacer algo con él aquí
        console.log("Usuario encontrado:", user);
      } else {
        // El usuario no fue encontrado
        console.log("Usuario no encontrado");
      }
    } catch (error) {
      // Ocurrió un error durante la búsqueda del usuario
      console.error("Error al buscar el usuario:", error);
    }


    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    // Revalidate path if necessary
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    // Log the error for debugging
    console.error(`Failed to create/update user: ${error.message}`);
    // Optionally, rethrow the error if you want to handle it elsewhere
    throw error;
  }
}
