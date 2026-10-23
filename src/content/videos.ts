import { photo, type Photo } from "./photo";

export interface Video {
  id: string;
  title: string;
  channel?: string;
  thumbnail: Photo;
  /** False when the owner has switched off embedding (YouTube answers 401): we link to YouTube instead. */
  embeddable: boolean;
}

const v = (id: string, title: string, channel: string | undefined, embeddable = true): Video => ({
  id,
  title,
  channel,
  embeddable,
  thumbnail: photo(`/images/video/${id}.jpg`, `Thumbnail of the video: ${title}`),
});

/**
 * The 15 videos of the old Electronic Media page, in its order. Titles are the ones YouTube returns for each video
 * (looked up on 23 Oct 2026); two videos have embedding disabled and no public title.
 */
export const videos: Video[] = [
  v("P4PtpWvrZmM", "Veda's by Reela Hota & Group", "Rays of Wisdom Society"),
  v("XlfyB4MDFKE", "Delhi hosts the 6th International Ancient Arts Festival Symposium 2018", "Rays of Wisdom Society"),
  v("v6HpM5B6Q3c", "Sanskrit The Mantra Bhasha by Rays of Wisdom Society", "Reela Hota"),
  v("x5Cylr8KLOM", "Rabindra Abhivyakti", undefined, false),
  v("Ei4TR6X6bcE", "Antar Yatra in the 5th International Ancient Arts Festival 2014", "Reela Hota"),
  v("5VwEKz_TLy8", "4th International Ancient Arts Festival", "Reela Hota"),
  v("TCAKqihKtNE", "3rd International Ancient Arts Festival 2012", "Reela Hota"),
  v("UqzdmbkcZhg", "2nd International Ancient Arts Festival 2011", "Reela Hota"),
  v("HYiu4-r9kQ0", "Good Evening India, DD National, 28 October 2016", "Reela Hota"),
  v("cS59ZJ-6868", "Mizoram takes to yoga for the first time with Bijoylaxmi Hota", "Reela Hota"),
  v("VsEJzk7Mdy0", "Reela Hota's Odissi dance on yogic philosophy", "Reela Hota"),
  v("on_zxM5VXxU", "TV coverage of the International Ancient Arts Festival 2013", "Reela Hota"),
  v("6eazvHYDi1I", "Opera in Ramleela, DD News", "Reela Hota"),
  v("ExxUR05aMTU", "Ramleela in Opera style", "IndiaPost Live"),
  v("9X8MuK7GnFw", "Rays of Wisdom Society video", undefined, false),
];

export const videoById = (id: string) => videos.find((v) => v.id === id);
