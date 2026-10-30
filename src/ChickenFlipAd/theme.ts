import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

export const { fontFamily: headline } = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const { fontFamily: body } = loadPoppins("normal", {
  weights: ["600", "800"],
  subsets: ["latin"],
});

export const colors = {
  flame: "#FF7A00",
  gold: "#FFC23D",
  red: "#B3121F",
  cream: "#FFF4E0",
  roast: "#1E0E05",
};
