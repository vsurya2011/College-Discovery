import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is missing. Put it in .env before running the seed.');
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

type CourseSeed = [string, string, number];
type CollegeSeed = {
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  overview: string;
  fees: number;
  rating: number;
  placementPct: number;
  avgPackage: number;
  highestPackage: number;
  website: string;
  exams: string[];
  imageUrl: string;
  courses: CourseSeed[];
};

const colleges: CollegeSeed[] = [
  {
    name: 'IIT Madras', slug: 'iit-madras', city: 'Chennai', state: 'Tamil Nadu',
    description: 'Premier engineering and research institute with a strong technology, research and startup ecosystem.',
    overview: 'IIT Madras offers undergraduate, postgraduate and research programs across engineering, science, management and humanities. The campus is known for deep industry connections and a large alumni network.',
    fees: 245000, rating: 4.8, placementPct: 92, avgPackage: 2200000, highestPackage: 12500000,
    website: 'https://www.iitm.ac.in', exams: ['JEE Advanced', 'GATE', 'JAM'], imageUrl: 'https://ia.iitm.ac.in/assets/images/homepage/iit-image1.png',
    courses: [['B.Tech Computer Science and Engineering','4 Years',120],['B.Tech Electrical Engineering','4 Years',100],['B.Tech Mechanical Engineering','4 Years',110],['M.Tech Computer Science','2 Years',60]],
  },
  {
    name: 'IIT Delhi', slug: 'iit-delhi', city: 'New Delhi', state: 'Delhi',
    description: 'Highly ranked technical university with strong placements, research and entrepreneurship opportunities.',
    overview: 'IIT Delhi blends rigorous engineering education with research labs, innovation programs and strong recruiter relationships. Students can explore technical clubs, startup support and interdisciplinary learning.',
    fees: 248000, rating: 4.7, placementPct: 93, avgPackage: 2250000, highestPackage: 11000000,
    website: 'https://home.iitd.ac.in', exams: ['JEE Advanced', 'GATE', 'JAM'], imageUrl: 'https://images.indianexpress.com/2024/08/Untitled-design-45-6.jpg',
    courses: [['B.Tech Computer Science and Engineering','4 Years',110],['B.Tech Mathematics and Computing','4 Years',90],['B.Tech Electrical Engineering','4 Years',100],['MBA','2 Years',70]],
  },
  {
    name: 'BITS Pilani', slug: 'bits-pilani', city: 'Pilani', state: 'Rajasthan',
    description: 'Private deemed university with flexible academics, strong tech culture and a large alumni network.',
    overview: 'BITS Pilani is known for flexible degree structures, practice school internships and an active technology ecosystem. It offers engineering, sciences, pharmacy and management programs.',
    fees: 590000, rating: 4.6, placementPct: 88, avgPackage: 1800000, highestPackage: 6000000,
    website: 'https://www.bits-pilani.ac.in', exams: ['BITSAT'], imageUrl: 'https://static.boostmytalent.com/img/univ/bits-pilani-aerial-view.jpeg',
    courses: [['B.E. Computer Science','4 Years',110],['B.E. Electronics & Instrumentation','4 Years',100],['B.E. Mechanical','4 Years',90],['M.Sc. Economics','4 Years',70]],
  },
  {
    name: 'Vellore Institute of Technology', slug: 'vit-vellore', city: 'Vellore', state: 'Tamil Nadu',
    description: 'Large private university with broad course choices, major recruiter participation and international exposure.',
    overview: 'VIT Vellore provides a broad selection of engineering specialisations and emphasizes projects, internships, industry certifications and global exchange opportunities.',
    fees: 215000, rating: 4.3, placementPct: 84, avgPackage: 950000, highestPackage: 4400000,
    website: 'https://vit.ac.in', exams: ['VITEEE'], imageUrl: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2024/08/17/2646675-5555.jpeg',
    courses: [['B.Tech Computer Science and Engineering','4 Years',540],['B.Tech AI & ML','4 Years',180],['B.Tech Electronics and Communication','4 Years',220],['B.Tech Mechanical Engineering','4 Years',140]],
  },
  {
    name: 'SRM Institute of Science and Technology', slug: 'srm-ktr', city: 'Chengalpattu', state: 'Tamil Nadu',
    description: 'Private university offering engineering, medicine, management and computing programs with strong industry links.',
    overview: 'SRM Kattankulathur combines large-scale campus facilities with a broad program portfolio, active student clubs and placement-focused industry engagement.',
    fees: 275000, rating: 4.2, placementPct: 81, avgPackage: 780000, highestPackage: 5200000,
    website: 'https://www.srmist.edu.in', exams: ['SRMJEEE'], imageUrl: 'https://oyecollege.com/storage/app/uploads/srm-institute-of-science-and-technology-kattankulathur_page_banner.jpg',
    courses: [['B.Tech CSE','4 Years',600],['B.Tech AI & Data Science','4 Years',180],['B.Tech ECE','4 Years',200],['MBA','2 Years',120]],
  },
  {
    name: 'Anna University', slug: 'anna-university', city: 'Chennai', state: 'Tamil Nadu',
    description: 'Public technical university with strong engineering programs and an extensive affiliated-college ecosystem.',
    overview: 'Anna University provides established engineering education with strong academic departments, research centers and industry-oriented curriculum.',
    fees: 95000, rating: 4.5, placementPct: 86, avgPackage: 850000, highestPackage: 3000000,
    website: 'https://www.annauniv.edu', exams: ['TNEA', 'TANCET', 'GATE'], imageUrl: 'https://content.findmycollege.com/colleges/20-anna-university-hostel-0389281b-4953-41c4-8839-a16f4160690a.jpg',
    courses: [['B.E. Computer Science and Engineering','4 Years',60],['B.E. Electronics and Communication','4 Years',60],['B.E. Mechanical Engineering','4 Years',60],['M.E. Computer Science','2 Years',30]],
  },
  {
    name: 'National Institute of Technology Trichy', slug: 'nit-trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu',
    description: 'Leading NIT with strong engineering academics, national recruiter presence and a vibrant campus community.',
    overview: 'NIT Trichy is a highly regarded technical institute with strong engineering departments, research opportunities, student chapters and national-level placements.',
    fees: 210000, rating: 4.6, placementPct: 90, avgPackage: 1400000, highestPackage: 6500000,
    website: 'https://www.nitt.edu', exams: ['JEE Main', 'GATE'], imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/National%20Institute%20of%20Technology%2C%20Trichy.jpg',
    courses: [['B.Tech Computer Science and Engineering','4 Years',115],['B.Tech Electronics and Communication','4 Years',110],['B.Tech Mechanical Engineering','4 Years',115],['B.Arch','5 Years',60]],
  },
  {
    name: 'Amrita Vishwa Vidyapeetham', slug: 'amrita-vishwa-vidyapeetham', city: 'Coimbatore', state: 'Tamil Nadu',
    description: 'Multi-campus private university with strong engineering, health sciences and research programs.',
    overview: 'Amrita combines engineering education with research centers and multidisciplinary programs. The Coimbatore campus has a strong technology and innovation community.',
    fees: 240000, rating: 4.4, placementPct: 82, avgPackage: 850000, highestPackage: 3000000,
    website: 'https://www.amrita.edu', exams: ['AEEE', 'CAT', 'GATE'], imageUrl: 'https://images.careerindia.com/college-photos/18216/avv-campus_1463054981.jpg',
    courses: [['B.Tech CSE','4 Years',360],['B.Tech AI & Data Science','4 Years',120],['B.Tech ECE','4 Years',120],['MBA','2 Years',90]],
  },
  {
    name: 'Manipal Institute of Technology', slug: 'manipal-institute-of-technology', city: 'Manipal', state: 'Karnataka',
    description: 'Established private engineering college known for student projects, placements and international exposure.',
    overview: 'Manipal Institute of Technology provides engineering programs with extensive labs, technical clubs, internships and campus recruitment opportunities.',
    fees: 420000, rating: 4.4, placementPct: 83, avgPackage: 1050000, highestPackage: 5400000,
    website: 'https://manipal.edu/mit.html', exams: ['MET'], imageUrl: 'https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/cover/947.jpg?v=1654254991',
    courses: [['B.Tech Computer Science and Engineering','4 Years',180],['B.Tech Information Technology','4 Years',120],['B.Tech Mechanical Engineering','4 Years',120],['B.Tech ECE','4 Years',150]],
  },
  {
    name: 'PSG College of Technology', slug: 'psg-college-of-technology', city: 'Coimbatore', state: 'Tamil Nadu',
    description: 'Autonomous engineering college with an industry-connected curriculum and strong regional placement network.',
    overview: 'PSG Tech has a long engineering education history and emphasizes practical learning, industry interaction, research and student innovation.',
    fees: 125000, rating: 4.5, placementPct: 87, avgPackage: 760000, highestPackage: 2800000,
    website: 'https://www.psgtech.edu', exams: ['TNEA', 'GATE'], imageUrl: 'https://manage.collnod.com/Upload/Content/web_img_0_18_8_2025_10_11_9.jpg',
    courses: [['B.E. Computer Science and Engineering','4 Years',60],['B.E. Information Technology','4 Years',60],['B.E. ECE','4 Years',60],['B.E. Mechanical Engineering','4 Years',60]],
  },
  {
    name: 'IIT Bombay', slug: 'iit-bombay', city: 'Mumbai', state: 'Maharashtra',
    description: 'Premier institute on Powai lake known for engineering, research, innovation and startup activity.',
    overview: 'IIT Bombay offers a broad engineering and science portfolio with strong research groups, entrepreneurship programs and industry collaboration.',
    fees: 238000, rating: 4.8, placementPct: 94, avgPackage: 2400000, highestPackage: 14500000,
    website: 'https://www.iitb.ac.in', exams: ['JEE Advanced', 'GATE', 'JAM'], imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/IITBMainBuildingCROP.jpg',
    courses: [['B.Tech Computer Science and Engineering','4 Years',120],['B.Tech Electrical Engineering','4 Years',100],['B.Tech Aerospace Engineering','4 Years',80]],
  },
  {
    name: 'IIT Kharagpur', slug: 'iit-kharagpur', city: 'Kharagpur', state: 'West Bengal',
    description: 'Large multidisciplinary IIT with strong engineering, technology and research programs.',
    overview: 'IIT Kharagpur combines a broad academic ecosystem with research centers, student organizations and a large recruiter network.',
    fees: 235000, rating: 4.7, placementPct: 91, avgPackage: 2200000, highestPackage: 12000000,
    website: 'https://www.iitkgp.ac.in', exams: ['JEE Advanced', 'GATE', 'JAM'], imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Main_Building_-_Indian_Institute_of_Technology_-_Kharagpur_-_West_Midnapore_2013-01-26_3687.JPG',
    courses: [['B.Tech Computer Science and Engineering','4 Years',120],['B.Tech Electronics and Electrical Communication','4 Years',100],['B.Tech Mechanical Engineering','4 Years',120]],
  },
  {
    name: 'IIT Kanpur', slug: 'iit-kanpur', city: 'Kanpur', state: 'Uttar Pradesh',
    description: 'Research-focused IIT with strong foundations in engineering, computing and sciences.',
    overview: 'IIT Kanpur is known for rigorous academics, research, entrepreneurship and strong technical clubs and labs.',
    fees: 230000, rating: 4.7, placementPct: 92, avgPackage: 2300000, highestPackage: 11000000,
    website: 'https://www.iitk.ac.in', exams: ['JEE Advanced', 'GATE', 'JAM'], imageUrl: 'https://media.assettype.com/kanpurwants/2023-12/610cf0f2-c31b-46a7-b62a-a2135082c6b6/IIT_Kanpur_Campus.jpg?auto=format%2Ccompress&enlarge=true&fit=max&h=1200&w=1200',
    courses: [['B.Tech Computer Science and Engineering','4 Years',120],['B.Tech Electrical Engineering','4 Years',120],['B.Tech Mechanical Engineering','4 Years',120]],
  },
  {
    name: 'IIT Hyderabad', slug: 'iit-hyderabad', city: 'Sangareddy', state: 'Telangana',
    description: 'Young IIT with modern infrastructure and strong programs in engineering, science and technology.',
    overview: 'IIT Hyderabad has a modern residential campus, interdisciplinary research and growing industry engagement across technology domains.',
    fees: 225000, rating: 4.5, placementPct: 88, avgPackage: 1900000, highestPackage: 8500000,
    website: 'https://www.iith.ac.in', exams: ['JEE Advanced', 'GATE'], imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/IIT%20Hyderabad.png',
    courses: [['B.Tech Computer Science and Engineering','4 Years',120],['B.Tech Artificial Intelligence','4 Years',80],['B.Tech Electrical Engineering','4 Years',80]],
  },
  {
    name: 'Indian Institute of Science', slug: 'iisc-bangalore', city: 'Bengaluru', state: 'Karnataka',
    description: 'India\'s leading research institute with a strong focus on science, engineering and advanced research.',
    overview: 'IISc emphasizes research-led education, advanced laboratories and interdisciplinary work across science and engineering.',
    fees: 90000, rating: 4.8, placementPct: 86, avgPackage: 1800000, highestPackage: 6000000,
    website: 'https://iisc.ac.in', exams: ['JEE Advanced', 'GATE', 'JAM'], imageUrl: 'https://www.iisc-inew.org/images/iisc.jpg',
    courses: [['B.Tech Mathematics and Computing','4 Years',52],['BS Research in Science','4 Years',111],['M.Tech Artificial Intelligence','2 Years',40]],
  },
  {
    name: 'National Institute of Technology Karnataka', slug: 'nitk-surathkal', city: 'Surathkal', state: 'Karnataka',
    description: 'Top NIT on the Karnataka coast with strong engineering programs and a large technical alumni network.',
    overview: 'NITK Surathkal combines strong technical education with a coastal residential campus, research activity and national recruiter participation.',
    fees: 205000, rating: 4.5, placementPct: 89, avgPackage: 1150000, highestPackage: 5500000,
    website: 'https://www.nitk.ac.in', exams: ['JEE Main', 'GATE'], imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/NITK%20mangalore.jpg',
    courses: [['B.Tech Computer Science and Engineering','4 Years',105],['B.Tech Information Technology','4 Years',75],['B.Tech ECE','4 Years',105]],
  },
  {
    name: 'National Institute of Technology Warangal', slug: 'nit-warangal', city: 'Warangal', state: 'Telangana',
    description: 'Leading NIT with established engineering departments, research activity and strong placements.',
    overview: 'NIT Warangal is known for engineering education, student technical organizations, research and strong recruiter participation.',
    fees: 205000, rating: 4.5, placementPct: 88, avgPackage: 1200000, highestPackage: 6200000,
    website: 'https://www.nitw.ac.in', exams: ['JEE Main', 'GATE'], imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/NITW%20Campus.JPG',
    courses: [['B.Tech Computer Science and Engineering','4 Years',115],['B.Tech Electronics and Communication','4 Years',115],['B.Tech Mechanical Engineering','4 Years',120]],
  },
  {
    name: 'IIT Roorkee', slug: 'iit-roorkee', city: 'Roorkee', state: 'Uttarakhand',
    description: 'Historic technical institute with strong engineering, architecture, science and research programs.',
    overview: 'IIT Roorkee has a long engineering legacy with a broad academic portfolio, research centers and strong alumni network.',
    fees: 232000, rating: 4.6, placementPct: 90, avgPackage: 2100000, highestPackage: 9500000,
    website: 'https://www.iitr.ac.in', exams: ['JEE Advanced', 'GATE', 'JAM'], imageUrl: 'https://images.indianexpress.com/2025/08/56f4da26ed956730309fa1488611ee0f13b0ac95ebb1bc9b5d210e31ff70e79c_IITR12_20250815070631.jpg?w=1200',
    courses: [['B.Tech Computer Science and Engineering','4 Years',100],['B.Tech Electronics and Communication','4 Years',100],['B.Arch','5 Years',30]],
  },
  {
    name: 'International Institute of Information Technology Hyderabad', slug: 'iiit-hyderabad', city: 'Hyderabad', state: 'Telangana',
    description: 'Focused computer science and engineering institute with a strong research and coding culture.',
    overview: 'IIIT Hyderabad is known for research-driven computer science education, labs, technical competitions and startup activity.',
    fees: 460000, rating: 4.6, placementPct: 93, avgPackage: 2100000, highestPackage: 8000000,
    website: 'https://www.iiit.ac.in', exams: ['JEE Main', 'UGEE', 'SPEC'], imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/IIIT%20Hyderabad%20-%20Main%20Building.png',
    courses: [['B.Tech Computer Science and Engineering','4 Years',100],['B.Tech Electronics and Communication Engineering','4 Years',60],['B.Tech in Computer Science + MS','5 Years',40]],
  },
  {
    name: 'Jadavpur University', slug: 'jadavpur-university', city: 'Kolkata', state: 'West Bengal',
    description: 'Public university with highly regarded engineering programs and a strong value-for-money proposition.',
    overview: 'Jadavpur University combines affordable public education with strong engineering departments, research and an active student community.',
    fees: 70000, rating: 4.5, placementPct: 87, avgPackage: 950000, highestPackage: 3500000,
    website: 'https://jadavpuruniversity.in', exams: ['WBJEE', 'GATE'], imageUrl: 'https://ksadmission.in/upload/university/jadavpur-university-kolkata-214593.jpg',
    courses: [['B.E. Computer Science and Engineering','4 Years',55],['B.E. Information Technology','4 Years',55],['B.E. Electronics and Telecommunication','4 Years',60]],
  },
  {
    name: 'Veermata Jijabai Technological Institute', slug: 'vjti-mumbai', city: 'Mumbai', state: 'Maharashtra',
    description: 'Historic autonomous engineering institute in Mumbai known for practical engineering education and strong placements.',
    overview: 'VJTI provides engineering education with strong industry links, technical student organizations and a central Mumbai location.',
    fees: 95000, rating: 4.4, placementPct: 86, avgPackage: 900000, highestPackage: 3200000,
    website: 'https://vjti.ac.in', exams: ['MHT CET', 'JEE Main', 'GATE'], imageUrl: 'https://www.cetbaba.in/_next/image?q=75&url=%2Fimages%2Fvjti.jpg&w=3840',
    courses: [['B.Tech Computer Engineering','4 Years',60],['B.Tech Information Technology','4 Years',60],['B.Tech Electronics Engineering','4 Years',60]],
  },
  {
    name: 'College of Engineering Guindy', slug: 'ceg-guindy', city: 'Chennai', state: 'Tamil Nadu',
    description: 'Historic engineering college under Anna University with strong academics and affordable public-university fees.',
    overview: 'CEG Guindy offers established engineering programs, research facilities and a strong alumni network in Chennai.',
    fees: 95000, rating: 4.6, placementPct: 88, avgPackage: 850000, highestPackage: 3200000,
    website: 'https://ceg.annauniv.edu', exams: ['TNEA', 'TANCET', 'GATE'], imageUrl: 'https://images.shiksha.com/mediadata/images/1547804071php6ai1GL.jpeg',
    courses: [['B.E. Computer Science and Engineering','4 Years',60],['B.E. Electronics and Communication','4 Years',60],['B.E. Mechanical Engineering','4 Years',60]],
  },
];

async function main() {
  await prisma.answer.deleteMany();
  await prisma.discussion.deleteMany();
  await prisma.review.deleteMany();
  await prisma.savedComparison.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  for (const c of colleges) {
    const college = await prisma.college.create({
      data: {
        name: c.name, slug: c.slug, city: c.city, state: c.state, description: c.description, overview: c.overview,
        fees: c.fees, rating: c.rating, placementPct: c.placementPct, avgPackage: c.avgPackage, highestPackage: c.highestPackage,
        website: c.website, exams: c.exams, imageUrl: c.imageUrl,
        courses: { create: c.courses.map((course) => ({ name: String(course[0]), duration: String(course[1]), seats: Number(course[2]) })) }
      }
    });
  }
  // Remove invalid placeholder reviews and create proper seeded content with a demo user.
  await prisma.review.deleteMany();
  const passwordHash = await bcrypt.hash('Demo@12345', 12);
  const user = await prisma.user.create({ data: { name: 'Demo Student', email: 'demo@collegediscovery.dev', passwordHash } });

  const all = await prisma.college.findMany({ select: { id: true, name: true } });
  for (const c of all) {
    await prisma.review.create({ data: { rating: 5, title: 'Very good option', body: `Good academics, active student community and helpful placement ecosystem at ${c.name}.`, userId: user.id, collegeId: c.id } });
    await prisma.review.create({ data: { rating: 4, title: 'Strong overall experience', body: `Good campus life and useful career opportunities. Compare fees and branch-specific outcomes before deciding.`, userId: user.id, collegeId: c.id } });
  }

  const first = all[0];
  const second = all[1];
  await prisma.discussion.create({ data: {
    title: 'How should I shortlist colleges after JEE Main?',
    body: 'I have a decent rank and want to balance placements, fees and location. What factors should I prioritize?',
    tags: ['JEE Main', 'Counselling', 'Placements'], userId: user.id,
    answers: { create: [{ body: 'Start with branch preference, then compare fees, median/average placements and past cutoffs.', userId: user.id }] }
  }});
  await prisma.discussion.create({ data: {
    title: 'Is a higher rating always a better college?',
    body: 'I see several colleges with similar ratings. How should I interpret the rating when making a final decision?',
    tags: ['College Selection', 'Ratings'], userId: user.id,
    answers: { create: [{ body: 'Use ratings as one signal. Branch-specific placements, fees and location usually need to be checked too.', userId: user.id }] }
  }});

  await prisma.savedCollege.create({ data: { userId: user.id, collegeId: first.id } });
  await prisma.savedComparison.create({ data: { userId: user.id, collegeIds: [first.id, second.id], label: 'Top JEE shortlist' } });
  console.log('Seed complete. Demo login: demo@collegediscovery.dev / Demo@12345');
}

main().catch(console.error).finally(() => prisma.$disconnect());
