import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string"
      ? newCabin.image?.startsWith(supabaseUrl)
      : false;

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(hasImagePath, imagePath);
  //  https://ytwbftlnenwkfijlqcev.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1.Create Cabin
  let query = supabase.from("cabins");

  // A) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //2. upload Image
  if (hasImagePath) return data;

  const imageFile = newCabin.image;
  console.log(imageFile, imageName);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete the cabin if there was an error uploading images
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storageError);
    throw new Error(
      "Cabin images could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
