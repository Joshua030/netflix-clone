import { Magic } from "magic-sdk";


const createMagic = (): Magic | false => {
  try {
    return (
      typeof window !== "undefined" &&
      new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY ?? "")
    );
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const magic: Magic | false = createMagic();

if (magic instanceof Magic) {
  console.log("magic setup", magic.auth);
} else {
  console.log("magic setup failed");
}
