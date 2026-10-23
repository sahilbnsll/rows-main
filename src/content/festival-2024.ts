import { photo, type Photo } from "./photo";

/** The 8th IAAF, 8 to 10 November 2024, IGNCA: day-by-day programme, from the old iaaf-2024.html. */
export const schedule2024 = {
  venue: "Indira Gandhi National Centre for the Arts, Janpath Building, near Western Court, Janpath, New Delhi 110001",
  venueUrl: "https://ignca.gov.in/",
  days: [
    {
      label: "Day 1",
      date: "8 November 2024",
      items: [
        { time: "6:30 pm", text: "Lighting of the lamp by Special Guest of Honour Dr Sachchidanand Joshi, Member Secretary, IGNCA, and Prof. (Dr) Richa Kamboj, HoD, Kaladarshana, IGNCA" },
        { time: "6:45 pm", text: "Collaborative dance by Sushree Reela Hota and group: Antar Yatra, The Inner Journey" },
      ],
    },
    {
      label: "Day 2",
      date: "9 November 2024",
      items: [
        { time: "6:30 pm", text: "Ancient Arts Award presentation ceremony: Guru Nityananda Das" },
        { time: "6:45 pm", text: "Vocal recital by Shri Srinivas Joshi" },
      ],
    },
    {
      label: "Day 3",
      date: "10 November 2024",
      items: [
        { time: "6:30 pm", text: "Lighting of the lamp" },
        { time: "6:45 pm", text: "Kuchipudi dance performance by Smt. Yamini Reddy and group" },
      ],
    },
  ],
};

export interface Speaker {
  name: string;
  role: string;
  topic?: string;
  time?: string;
  /** "Chair" sessions are listed as the old page did: Topic: Chair. */
  chair?: boolean;
  portrait: Photo;
}

export interface ConferenceSession {
  title: string;
  time: string;
  heading?: string;
  speakers: Speaker[];
}

export interface ConferenceDay {
  label: string;
  date: string;
  convener: string;
  sessions: ConferenceSession[];
}

const sp = (n: number, name: string, role: string, opts: { topic?: string; time?: string; chair?: boolean } = {}): Speaker => ({
  name,
  role,
  ...opts,
  portrait: photo(`/images/conference/2024/${String(n).padStart(2, "0")}.jpg`, `Portrait of ${name}`),
});

export const conference = {
  title: "IAA Conference 2024",
  theme: "Religion, Consciousness, & Spirituality As Expressed In Arts",
  venue: "Umang Conference Room, IGNCA, New Delhi",
  dates: "9 and 10 November 2024",
  inaugural: {
    title: "Welcome address and inaugural session",
    note: "Registration and lamp lighting",
    speakers: [
      sp(29, "Dr Sachchidananda Joshi", "Member Secretary, Executive and Academic Head, Indira Gandhi National Centre for the Arts (Special Guest of Honour)", { time: "10:35 to 10:40 am" }),
      sp(30, "Prof. (Dr) Richa Kamboj", "Head of Department, Kaladarsana Division, Indira Gandhi National Centre for the Arts", { time: "10:40 to 10:45 am" }),
      sp(13, "Dr Reela Hota", "Odissi dance performer and former Senior Fellow, Ministry of Culture, Government of India", { time: "10:45 to 10:50 am" }),
      sp(17, "Dr Manindra Nath Thakur", "Associate Professor, Centre for Political Studies, Jawaharlal Nehru University", { time: "10:50 to 10:55 am" }),
    ],
  },
  days: [
    {
      label: "9 November",
      date: "Day 1 of the conference",
      convener: "Dr Reela Hota",
      sessions: [
        {
          title: "Keynote speech",
          time: "10:55 to 11:30 am",
          speakers: [sp(1, "Dr Madhu Khanna", "Professor of Indic Religion, Tagore National Fellow, National Museum, New Delhi")],
        },
        {
          title: "Session 1",
          heading: "Desire, Consciousness and Creativity",
          time: "11:45 am to 1:15 pm",
          speakers: [
            sp(2, "Prof. Sukrita Paul Kumar", "Professor, Department of English, Zakir Husain College, Delhi University", { chair: true }),
            sp(3, "Guru Ramli Ibrahim, Malaysia", "Chairman, Sutra Foundation (online session)", { topic: "Dealing with Unfulfilled Desires: Malay Traditional Psychotherapy Healing & Appeasing Strong Inherent Temperaments" }),
            sp(4, "Prof. Sudeep Patra", "Professor, Jindal School of Government and Public Policy, Jindal Global University", { topic: "Science, Spirituality and Art" }),
            sp(5, "Prof. Swati Pal", "Principal, Janki Devi College, Delhi University", { topic: "Evoking Consciousness Through Creative Self-expression: Word, Performance And Arts" }),
          ],
        },
        {
          title: "Session 2",
          heading: "Conflict, Art & Social Healing",
          time: "2:15 to 3:45 pm",
          speakers: [
            sp(6, "Prof. Satish Kumar Jha", "Professor, Department of Political Science, Aryabhatta College, Delhi University", { chair: true }),
            sp(7, "Dr Rina Kashyap", "Associate Professor, Department of Political Science, Lady Shri Ram College, Delhi University", { topic: "Art and Conflict Resolution" }),
            sp(8, "Shri Amit Kalla", "Distinguished poet and painter, founder Ramta Drig", { topic: "Ramta Drig Collective Movement: My Experiences with Community Empowerment through Creativity" }),
            sp(9, "Shri Rakesh Ranjan Das", "PhD research scholar at the Centre for Political Studies, Jawaharlal Nehru University, New Delhi", { topic: "Spirituality, Consciousness and Social Healing in Baul Philosophy" }),
            sp(10, "Sushree Varsha Rani", "PhD research scholar at the Centre for Political Studies, Jawaharlal Nehru University, New Delhi", { topic: "Spirituality, Consciousness and Social Healing in Baul Philosophy" }),
          ],
        },
        {
          title: "Session 3",
          heading: "Art, Spirituality & Therapeutic Aesthetics",
          time: "4:00 to 5:45 pm",
          speakers: [
            sp(11, "Prof. Madhulika Banerjee", "Professor, Department of Political Science, Delhi University", { chair: true }),
            sp(12, "Dr Priya Kanungo", "Professor, Jindal School of Liberal Arts and Humanities, O.P. Jindal Global University", { topic: "Song for God" }),
            sp(13, "Dr Reela Hota", "Odissi dance performer and former Senior Fellow, Ministry of Culture, Government of India", { topic: "The Healing Odissi and the Universal Principles in it" }),
            sp(14, "Sushree Anshuma Keshetrpal", "President, Indian Association of Dance Movement Therapy; President, Drama Therapy Association of India", { topic: "Drama Movement and Therapeutics" }),
          ],
        },
      ],
    },
    {
      label: "10 November",
      date: "Day 2 of the conference",
      convener: "Dr Manindra Nath Thakur",
      sessions: [
        {
          title: "Session 4",
          heading: "Religion, Spirituality and Art",
          time: "10:00 to 11:30 am",
          speakers: [
            sp(15, "Dr Shashi Bala", "Dean, K. M. Munshi Centre of Indology, Bharatiya Vidya Bhavan, New Delhi (special lecture)", { topic: "Buddhist Art and Spirituality" }),
            sp(16, "Prof. Vibha Chaturvedi", "Former HOD, Department of Philosophy, Delhi University", { chair: true }),
            sp(17, "Dr Manindra Nath Thakur", "Associate Professor, Centre for Political Studies, Jawaharlal Nehru University", { topic: "Neuro Aesthetics, Consciousness, and Spirituality: In Search of a Perspective on Art and Healing" }),
            sp(18, "Dr Varun Wighmal", "Assistant Professor, Department of Political Science, St. Joseph's University", { topic: "Neuro Aesthetics, Consciousness, and Spirituality: In Search of a Perspective on Art and Healing" }),
            sp(19, "Dr Anand Burdhan", "Dy. Dean, School of Heritage, Ambedkar University", { topic: "Metaphysics of Temple Architecture" }),
          ],
        },
        {
          title: "Session 5",
          heading: "Spirituality, Performance & Experience",
          time: "11:45 am to 1:15 pm",
          speakers: [
            sp(20, "Prof. Bhagat Oinam", "Chairperson, Centre for Philosophy, SSS, JNU; concurrent chairperson, Special Centre for the Study of North East India, JNU", { chair: true }),
            sp(21, "Dr Uma Rele", "Principal, Nalanda Nritya Kala Mahavidyalaya, Mumbai (online session)", { topic: "The Three \"Es\" of Indian Dance: Expressions, Emotions and Experience" }),
            sp(22, "Dr Ashish Ghosh", "Children's theatre activist, retired Associate Professor, Dayal Singh Evening College, Delhi University", { topic: "Epistemology and Aesthetics in Children's Theatre" }),
            sp(23, "Sushree Kheersana Yumlembem", "Manipuri dance performer, Senior Fellow, Ministry of Culture", { topic: "The Elements Of Spirituality in Manipuri Music & Dance" }),
          ],
        },
        {
          title: "Session 6",
          heading: "Creativity, Reflexivity and Poetry",
          time: "2:15 to 3:45 pm",
          speakers: [
            sp(24, "Prof. R. P. Singh", "Dean, Faculty of Humanities and Religious Studies, Guru Nanak Dev University, Amritsar; visiting professor, Centre for Philosophy, School of Social Sciences, JNU, New Delhi", { chair: true }),
            sp(25, "Prof. Savita Singh", "Professor, School of Gender and Development Studies, IGNOU", { topic: "Arts as Human Experience: Concrete and Transcendent" }),
            sp(26, "Prof. Akhlaque Ahmad 'Ahan'", "Poet, professor and chairperson, Center of Persian and Central Asian Studies, Jawaharlal Nehru University", { topic: "Sufism, and the Power of the Poetic Word" }),
            sp(27, "Prof. Sanjeev Kaushal", "Professor of English, IGIPESS, Delhi University", { topic: "Exploring the Concept of Universal Consciousness in Poetry" }),
          ],
        },
        {
          title: "Session 7: Valedictory",
          time: "3:45 to 5:45 pm",
          speakers: [sp(28, "Prof. Arvind Sharma", "Birks Professor of Religion, McGill University, Canada (30 min online video)", { topic: "The Aesthetics of Advaita Vedanta" })],
        },
      ],
    },
  ] as ConferenceDay[],
  closing: "Round table on \"Religion, Spirituality, Aesthetics and Healing\", concluding session and vote of thanks.",
};
