import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File | null | undefined) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
        ID.unique(),
        file,
    );

    return fileUploaded;
}

export default uploadImage