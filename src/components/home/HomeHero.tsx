import { photos } from "@/content/festival-2026";
import { LensZoomHero, type LensSlide } from "./LensZoomHero";

/** Five photographs from the festival, the sharpest the Society has (2,000 px and wider), each named for who is in it. */
const slides: LensSlide[] = [
  { ...photos.mantraTemple, title: "Princess Panigrahi and Priyanka Das", caption: "Odissi in a carved temple doorway · IAAF 2026", position: "62% 55%" },
  { ...photos.sudarushkaStage, title: "Sudarushka", caption: "Russian folk dance, a khorovod about to form · IAAF 2026", position: "50% 40%" },
  { ...photos.gauriPortrait, title: "Gauri Diwakar", caption: "Kathak · IAAF 2026", position: "62% 25%" },
  { ...photos.mantraDuo, title: "Odissi in duet", caption: "One dancer leans in, the other reaches back · IAAF 2026", position: "55% 45%" },
  { ...photos.abhaySantoor, title: "Pandit Abhay Rustum Sopori", caption: "Santoor · IAAF 2026", position: "64% 50%" },
];

export function HomeHero() {
  return <LensZoomHero slides={slides} />;
}
