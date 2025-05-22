import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    html,
    css,
    reactjs,
    tailwind,
    mongodb,
    git,
    figma,
    docker,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";

  import rkvm from '../assets/rkvm.png';  // Adjust the path based on your file structure
  import brkm from '../assets/brkm.png';
  import bppimt from '../assets/bppimt.png';

  import python from '../assets/python.png';
  import c from '../assets/c.png';
  import cpp from '../assets/cpp.png';
  import gh from '../assets/gh.png';
  import java from '../assets/java.png';

  import ty from '../assets/ty.jpg';
  import lca from '../assets/lca.png';
  import lok from '../assets/lok.png';
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "DSA Enthusiast",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Problem Solver",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "Python",
      icon: python,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "C",
      icon: c,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "C++",
      icon: cpp,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Java",
      icon: java,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "Github",
      icon: gh,
    },
  ];
  
  const experiences = [
    {
      title: "Secondary",
      company_name: "Ramakrishna Vivekananda Mission Vidyabhawan",
      icon: rkvm,
      iconBg: "#E6DEDD",
      date: "Jan 2011 - June 2021",
      points: [
        "Successfully completed 10 years of schooling with a strong academic record and active participation in school activities.",
        "Honored with multiple accolades for academic and extracurricular achievements during schooling.",
        "Received the Governor’s Award for exceptional performance in Class VII.",
        "Consistently maintained excellent academic performance, achieving 90.1% in Class 10 Board Examinations.",
      ],
    },
    {
      title: "Higher Secondary",
      company_name: "Baranagore Ramakrishna Mission Ashrama High School ",
      icon: brkm,
      iconBg: "#E6DEDD",
      date: "Aug 2021 - Feb 2023",
      points: [
        "Contributed to team success through active participation and teamwork in sports competitions.",
        "Balanced academics with extracurricular activities, showcasing a well-rounded skillset.",
        "Played an integral role in the school football team, securing runners-up position in an inter-school tournament.",
        "Achieved 85.8% in Class 12 Board Examinations, demonstrating consistent dedication to academics.",
      ],
    },
    {
      title: "B.Tech in CSE",
      company_name: "B.P. Poddar Institute of Management and Technology",
      icon: bppimt,
      iconBg: "#E6DEDD",
      date: "Sept 2023 - Present",
      points: [
        "Successfully worked on academic and team projects, demonstrating both technical expertise and collaborative skills",
        "Proficient in multiple programming languages, including [C, Python, JS], with experience in building real-world solutions.",
        "Developed a solid foundation in analytical and problem-solving abilities through coursework, projects, and competitive programming.",
        "Pursuing B.Tech in Computer Science and Engineering with a current GPA of 8.99, showcasing strong academic performance.",
      ],
    },
  ];
  
  const questions = [
    {
      question: "Who's My Favourite Footballer ?",
      options: ["C. Ronaldo", "L. Messi", "K. Mbappe", "P. Maldini"],
      correctAnswer: "C. Ronaldo",  // Add the correct answer for this question
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",  // Add the correct answer for this question
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",  // Add the correct answer for this question
    },
  ];
  

  
  const projects = [
    {
      name: "Trade Yogi",
      description:
        "Trade Yogi is an intuitive app providing trading knowledge, company insights, and ML-driven profit/loss predictions, empowering users to make informed financial decisions effortlessly.",
      tags: [
        {
          name: "Javascript",
          color: "blue-text-gradient",
        },
        {
          name: "python",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: ty,
      source_code_link: "https://github.com/aniket123de",
    },
    {
      name: "Coal Mine LCA Software",
      description:
        "The Coal Mine LCA software evaluates environmental impacts of coal mining operations, integrating user and sensor data to provide comprehensive life cycle assessments for sustainability insights.",
      tags: [
        {
          name: "html",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "javascript",
          color: "pink-text-gradient",
        },
      ],
      image: lca,
      source_code_link: "https://github.com/aniket123de/SIH1644",
    },
    {
      name: "Lok Seva",
      description:
        "Lok Seva is a web application designed to streamline the process of applying for various government services, making it easier for citizens to access essential services and information.",
      tags: [
        {
          name: "supabase",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "react",
          color: "pink-text-gradient",
        },
      ],
      image: lok,
      source_code_link: "https://github.com/aniket123de/LokSeva",
    },
  ];
  
  export { services, technologies, experiences, questions, projects };