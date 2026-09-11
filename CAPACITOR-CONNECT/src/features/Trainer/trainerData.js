const trainers = [
  {
    id: 201,
    name: "Dr. Rajiv Mehta",
    email: "rajiv.mehta@example.com",
    phone: "+91 9876501234",
    role: "trainer",
    status: "Active",
    joinedDate: "2026-04-10",

    profile: {
      designation: "Senior Meteorologist",
      organization: "India Meteorological Department",
      qualification: "M.Tech Atmospheric Sciences",
      experience: 14,
      location: "New Delhi",
      bio: "Senior meteorologist specializing in weather forecasting, atmospheric science and climate analysis."
    },

    skills: [
      "Meteorology",
      "Weather Forecasting",
      "Climate Science",
      "Atmospheric Science",
      "Data Analysis"
    ],

    subjects: [
      "Weather Forecasting",
      "Climate Science",
      "Atmospheric Science"
    ],

    interests: [
      "Climate Research",
      "Weather Technology",
      "Scientific Education"
    ],

    courses: [
      {
        courseId: 101,
        title: "Fundamentals of Weather Forecasting",
        category: "Meteorology",
        status: "Published",
        enrolledTrainees: 86,
        completionRate: 78
      },
      {
        courseId: 102,
        title: "Introduction to Climate Science",
        category: "Climate",
        status: "Published",
        enrolledTrainees: 64,
        completionRate: 72
      }
    ],

    performance: {
      totalCourses: 2,
      totalTrainees: 150,
      averageCourseRating: 4.8,
      averageTraineeScore: 87,
      courseCompletionRate: 75
    },

    activity: {
      lastActive: "2026-09-09",
      lecturesUploaded: 24,
      resourcesUploaded: 42,
      assessmentsCreated: 8
    },

    questionnaires: [
      {
        id: 301,
        title: "Weather Forecasting Fundamentals",
        courseId: 101,
        deadline: "2026-09-20",
        participants: 72,
        completed: 58,
        status: "Active"
      }
    ]
  },

  {
    id: 202,
    name: "Dr. Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 9812345678",
    role: "trainer",
    status: "Active",
    joinedDate: "2026-05-02",

    profile: {
      designation: "Climate Data Scientist",
      organization: "National Climate Research Centre",
      qualification: "Ph.D. Climate Science",
      experience: 9,
      location: "Bengaluru",
      bio: "Climate data scientist working on climate modelling, statistical analysis and environmental datasets."
    },

    skills: [
      "Python",
      "Climate Science",
      "Data Analysis",
      "Machine Learning",
      "Statistics"
    ],

    subjects: [
      "Climate Data Analysis",
      "Python",
      "Statistics",
      "Machine Learning"
    ],

    interests: [
      "Climate Modelling",
      "Artificial Intelligence",
      "Environmental Data"
    ],

    courses: [
      {
        courseId: 103,
        title: "Climate Data Analysis",
        category: "Data Science",
        status: "Published",
        enrolledTrainees: 94,
        completionRate: 81
      },
      {
        courseId: 104,
        title: "Python for Climate Science",
        category: "Programming",
        status: "Published",
        enrolledTrainees: 71,
        completionRate: 74
      }
    ],

    performance: {
      totalCourses: 2,
      totalTrainees: 165,
      averageCourseRating: 4.7,
      averageTraineeScore: 91,
      courseCompletionRate: 78
    },

    activity: {
      lastActive: "2026-09-08",
      lecturesUploaded: 31,
      resourcesUploaded: 56,
      assessmentsCreated: 11
    },

    questionnaires: [
      {
        id: 302,
        title: "Climate Data Analysis Assessment",
        courseId: 103,
        deadline: "2026-09-18",
        participants: 82,
        completed: 69,
        status: "Active"
      }
    ]
  },

  {
    id: 203,
    name: "Amit Verma",
    email: "amit.verma@example.com",
    phone: "+91 9765432189",
    role: "trainer",
    status: "Active",
    joinedDate: "2026-06-15",

    profile: {
      designation: "Software Development Trainer",
      organization: "MoES Training Division",
      qualification: "M.Tech Computer Science",
      experience: 7,
      location: "Lucknow",
      bio: "Technology trainer focused on software development, cloud technologies and modern programming practices."
    },

    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Cloud Computing",
      "Git",
      "REST APIs"
    ],

    subjects: [
      "Web Development",
      "Cloud Computing",
      "Software Engineering"
    ],

    interests: [
      "Web Technologies",
      "Cloud Computing",
      "Developer Education"
    ],

    courses: [
      {
        courseId: 105,
        title: "Modern Web Development",
        category: "Software Development",
        status: "Published",
        enrolledTrainees: 112,
        completionRate: 69
      },
      {
        courseId: 106,
        title: "Cloud Computing Fundamentals",
        category: "Cloud",
        status: "Published",
        enrolledTrainees: 88,
        completionRate: 64
      },
      {
        courseId: 107,
        title: "Version Control with Git",
        category: "Software Development",
        status: "Draft",
        enrolledTrainees: 0,
        completionRate: 0
      }
    ],

    performance: {
      totalCourses: 3,
      totalTrainees: 200,
      averageCourseRating: 4.5,
      averageTraineeScore: 81,
      courseCompletionRate: 66
    },

    activity: {
      lastActive: "2026-09-09",
      lecturesUploaded: 38,
      resourcesUploaded: 61,
      assessmentsCreated: 14
    },

    questionnaires: [
      {
        id: 303,
        title: "React Fundamentals Assessment",
        courseId: 105,
        deadline: "2026-09-22",
        participants: 96,
        completed: 71,
        status: "Active"
      }
    ]
  },

  {
    id: 204,
    name: "Dr. Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    phone: "+91 9898123456",
    role: "trainer",
    status: "Active",
    joinedDate: "2026-05-27",

    profile: {
      designation: "Environmental Scientist",
      organization: "Environmental Research Institute",
      qualification: "Ph.D. Environmental Science",
      experience: 11,
      location: "Mumbai",
      bio: "Environmental scientist specializing in air quality, environmental monitoring and pollution analysis."
    },

    skills: [
      "Environmental Science",
      "Air Quality",
      "Pollution Monitoring",
      "Data Analysis",
      "Research"
    ],

    subjects: [
      "Air Quality",
      "Environmental Monitoring",
      "Pollution Analysis"
    ],

    interests: [
      "Air Pollution",
      "Public Health",
      "Environmental Monitoring"
    ],

    courses: [
      {
        courseId: 108,
        title: "Air Quality Monitoring",
        category: "Environment",
        status: "Published",
        enrolledTrainees: 73,
        completionRate: 83
      },
      {
        courseId: 109,
        title: "Environmental Monitoring Techniques",
        category: "Environment",
        status: "Published",
        enrolledTrainees: 51,
        completionRate: 77
      }
    ],

    performance: {
      totalCourses: 2,
      totalTrainees: 124,
      averageCourseRating: 4.9,
      averageTraineeScore: 89,
      courseCompletionRate: 80
    },

    activity: {
      lastActive: "2026-09-07",
      lecturesUploaded: 27,
      resourcesUploaded: 48,
      assessmentsCreated: 9
    },

    questionnaires: [
      {
        id: 304,
        title: "Air Quality Assessment",
        courseId: 108,
        deadline: "2026-09-25",
        participants: 61,
        completed: 47,
        status: "Active"
      }
    ]
  },

  {
    id: 205,
    name: "Vivek Joshi",
    email: "vivek.joshi@example.com",
    phone: "+91 9823456710",
    role: "trainer",
    status: "Active",
    joinedDate: "2026-07-08",

    profile: {
      designation: "Data Analytics Trainer",
      organization: "MoES Training Division",
      qualification: "M.Sc Data Science",
      experience: 5,
      location: "Jaipur",
      bio: "Data analytics trainer specializing in statistics, visualization and practical data-driven decision making."
    },

    skills: [
      "Python",
      "SQL",
      "Statistics",
      "Data Visualization",
      "Power BI",
      "Excel"
    ],

    subjects: [
      "Data Analytics",
      "Statistics",
      "Python",
      "Data Visualization"
    ],

    interests: [
      "Data Science",
      "Visualization",
      "Artificial Intelligence"
    ],

    courses: [
      {
        courseId: 110,
        title: "Data Analytics Fundamentals",
        category: "Data Science",
        status: "Published",
        enrolledTrainees: 79,
        completionRate: 71
      }
    ],

    performance: {
      totalCourses: 1,
      totalTrainees: 79,
      averageCourseRating: 4.4,
      averageTraineeScore: 78,
      courseCompletionRate: 71
    },

    activity: {
      lastActive: "2026-09-06",
      lecturesUploaded: 15,
      resourcesUploaded: 29,
      assessmentsCreated: 6
    },

    questionnaires: [
      {
        id: 305,
        title: "Data Analytics Basics",
        courseId: 110,
        deadline: "2026-09-16",
        participants: 67,
        completed: 49,
        status: "Active"
      }
    ]
  },

  {
    id: 206,
    name: "Ankit Malhotra",
    email: "ankit.malhotra@example.com",
    phone: "+91 9701234567",
    role: "trainer",
    status: "Pending",
    joinedDate: "2026-09-08",

    profile: {
      designation: "Research Scientist",
      organization: "Independent Research Division",
      qualification: "M.Tech Electronics",
      experience: 4,
      location: "Hyderabad",
      bio: "Research scientist with experience in IoT systems, sensors and environmental monitoring technologies."
    },

    skills: [
      "IoT",
      "Embedded Systems",
      "Sensors",
      "Python",
      "Data Collection"
    ],

    subjects: [
      "IoT",
      "Environmental Sensors",
      "Data Collection"
    ],

    interests: [
      "IoT",
      "Smart Monitoring",
      "Environmental Technology"
    ],

    courses: [],

    performance: {
      totalCourses: 0,
      totalTrainees: 0,
      averageCourseRating: 0,
      averageTraineeScore: 0,
      courseCompletionRate: 0
    },

    activity: {
      lastActive: "2026-09-08",
      lecturesUploaded: 0,
      resourcesUploaded: 0,
      assessmentsCreated: 0
    },

    questionnaires: []
  }
];

export default trainers;