const trainees = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 9876543210",
    role: "trainee",
    status: "Active",
    joinedDate: "2026-07-12",

    qualification: "B.Tech Computer Science",
    institution: "KCC Institute of Technology and Management",
    workExperience: 1,

    skills: ["JavaScript", "React", "Git", "HTML", "CSS"],
    interests: ["Web Development", "Cloud Computing"],

    learning: {
      enrolledCourses: [
        {
          courseId: 101,
          title: "Modern Web Development",
          progress: 82,
          status: "In Progress"
        },
        {
          courseId: 102,
          title: "Cloud Computing Fundamentals",
          progress: 45,
          status: "In Progress"
        },
        {
          courseId: 103,
          title: "Git and Version Control",
          progress: 100,
          status: "Completed"
        }
      ],
      completedCourses: 1,
      certificates: [
        {
          id: "CERT-1001",
          course: "Git and Version Control",
          issuedDate: "2026-08-18"
        }
      ]
    },

    performance: {
      totalPerformance: 86,
      completionRate: 76,
      assessmentsCompleted: 8,
      assessmentsTotal: 10,

      recentPerformance: [
        {
          assessment: "JavaScript Fundamentals",
          score: 91,
          date: "2026-09-06"
        },
        {
          assessment: "React Basics",
          score: 84,
          date: "2026-09-01"
        },
        {
          assessment: "Git and GitHub",
          score: 88,
          date: "2026-08-25"
        }
      ]
    },

    activity: {
      lastActive: "2026-09-09",
      learningHours: 42,
      coursesInProgress: 2
    }
  },

  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    phone: "+91 9812345670",
    role: "trainee",
    status: "Active",
    joinedDate: "2026-06-25",

    qualification: "M.Sc Environmental Science",
    institution: "University of Delhi",
    workExperience: 2,

    skills: ["Python", "Data Analysis", "Excel", "GIS"],
    interests: ["Climate Science", "Data Science"],

    learning: {
      enrolledCourses: [
        {
          courseId: 104,
          title: "Climate Data Analysis",
          progress: 94,
          status: "In Progress"
        },
        {
          courseId: 105,
          title: "Python for Data Science",
          progress: 100,
          status: "Completed"
        }
      ],
      completedCourses: 1,
      certificates: [
        {
          id: "CERT-1002",
          course: "Python for Data Science",
          issuedDate: "2026-08-30"
        }
      ]
    },

    performance: {
      totalPerformance: 93,
      completionRate: 91,
      assessmentsCompleted: 9,
      assessmentsTotal: 9,

      recentPerformance: [
        {
          assessment: "Climate Data Fundamentals",
          score: 96,
          date: "2026-09-07"
        },
        {
          assessment: "Python Data Analysis",
          score: 91,
          date: "2026-09-02"
        },
        {
          assessment: "Environmental Data",
          score: 94,
          date: "2026-08-26"
        }
      ]
    },

    activity: {
      lastActive: "2026-09-09",
      learningHours: 58,
      coursesInProgress: 1
    }
  },

  {
    id: 3,
    name: "Rohan Singh",
    email: "rohan.singh@example.com",
    phone: "+91 9765432108",
    role: "trainee",
    status: "Active",
    joinedDate: "2026-08-02",

    qualification: "B.Sc Mathematics",
    institution: "University of Lucknow",
    workExperience: 0,

    skills: ["Python", "Statistics", "SQL"],
    interests: ["Data Science", "Machine Learning"],

    learning: {
      enrolledCourses: [
        {
          courseId: 106,
          title: "Introduction to Data Science",
          progress: 61,
          status: "In Progress"
        },
        {
          courseId: 107,
          title: "Statistics for Data Analysis",
          progress: 38,
          status: "In Progress"
        }
      ],
      completedCourses: 0,
      certificates: []
    },

    performance: {
      totalPerformance: 72,
      completionRate: 49,
      assessmentsCompleted: 5,
      assessmentsTotal: 8,

      recentPerformance: [
        {
          assessment: "Statistics Basics",
          score: 74,
          date: "2026-09-05"
        },
        {
          assessment: "Python Fundamentals",
          score: 69,
          date: "2026-08-29"
        },
        {
          assessment: "Data Analysis Introduction",
          score: 73,
          date: "2026-08-20"
        }
      ]
    },

    activity: {
      lastActive: "2026-09-08",
      learningHours: 27,
      coursesInProgress: 2
    }
  },

  {
    id: 4,
    name: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    phone: "+91 9898989898",
    role: "trainee",
    status: "Active",
    joinedDate: "2026-05-18",

    qualification: "B.Tech Electronics and Communication",
    institution: "AKTU",
    workExperience: 2,

    skills: ["Python", "IoT", "Embedded Systems", "C++"],
    interests: ["IoT", "Weather Technology", "Embedded Systems"],

    learning: {
      enrolledCourses: [
        {
          courseId: 108,
          title: "IoT Fundamentals",
          progress: 100,
          status: "Completed"
        },
        {
          courseId: 109,
          title: "Weather Technology",
          progress: 87,
          status: "In Progress"
        }
      ],
      completedCourses: 1,
      certificates: [
        {
          id: "CERT-1003",
          course: "IoT Fundamentals",
          issuedDate: "2026-08-11"
        }
      ]
    },

    performance: {
      totalPerformance: 89,
      completionRate: 84,
      assessmentsCompleted: 10,
      assessmentsTotal: 11,

      recentPerformance: [
        {
          assessment: "IoT Fundamentals",
          score: 92,
          date: "2026-09-04"
        },
        {
          assessment: "Weather Technology",
          score: 87,
          date: "2026-08-28"
        },
        {
          assessment: "Embedded Systems",
          score: 88,
          date: "2026-08-21"
        }
      ]
    },

    activity: {
      lastActive: "2026-09-09",
      learningHours: 51,
      coursesInProgress: 1
    }
  },

  {
    id: 5,
    name: "Vikram Patel",
    email: "vikram.patel@example.com",
    phone: "+91 9753124680",
    role: "trainee",
    status: "Active",
    joinedDate: "2026-07-05",

    qualification: "B.Tech Information Technology",
    institution: "NIT Jaipur",
    workExperience: 1,

    skills: ["Java", "SQL", "Spring Boot", "Git"],
    interests: ["Backend Development", "Cloud Computing"],

    learning: {
      enrolledCourses: [
        {
          courseId: 110,
          title: "Backend Development",
          progress: 72,
          status: "In Progress"
        },
        {
          courseId: 111,
          title: "Database Management",
          progress: 100,
          status: "Completed"
        }
      ],
      completedCourses: 1,
      certificates: [
        {
          id: "CERT-1004",
          course: "Database Management",
          issuedDate: "2026-08-22"
        }
      ]
    },

    performance: {
      totalPerformance: 81,
      completionRate: 78,
      assessmentsCompleted: 7,
      assessmentsTotal: 9,

      recentPerformance: [
        {
          assessment: "SQL Fundamentals",
          score: 85,
          date: "2026-09-03"
        },
        {
          assessment: "Backend Architecture",
          score: 79,
          date: "2026-08-27"
        },
        {
          assessment: "Database Management",
          score: 88,
          date: "2026-08-19"
        }
      ]
    },

    activity: {
      lastActive: "2026-09-07",
      learningHours: 39,
      coursesInProgress: 1
    }
  },

  {
    id: 6,
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 9823456712",
    role: "trainee",
    status: "Active",
    joinedDate: "2026-06-14",

    qualification: "M.Tech Atmospheric Science",
    institution: "IIT Delhi",
    workExperience: 3,

    skills: ["Meteorology", "Python", "Data Analysis", "Research"],
    interests: ["Weather Forecasting", "Climate Research"],

    learning: {
      enrolledCourses: [
        {
          courseId: 112,
          title: "Advanced Weather Forecasting",
          progress: 96,
          status: "In Progress"
        },
        {
          courseId: 113,
          title: "Climate Data Analysis",
          progress: 100,
          status: "Completed"
        },
        {
          courseId: 114,
          title: "Research Methodology",
          progress: 100,
          status: "Completed"
        }
      ],
      completedCourses: 2,
      certificates: [
        {
          id: "CERT-1005",
          course: "Climate Data Analysis",
          issuedDate: "2026-08-05"
        },
        {
          id: "CERT-1006",
          course: "Research Methodology",
          issuedDate: "2026-08-28"
        }
      ]
    },

    performance: {
      totalPerformance: 97,
      completionRate: 95,
      assessmentsCompleted: 12,
      assessmentsTotal: 12,

      recentPerformance: [
        {
          assessment: "Advanced Weather Forecasting",
          score: 98,
          date: "2026-09-08"
        },
        {
          assessment: "Climate Analysis",
          score: 96,
          date: "2026-09-01"
        },
        {
          assessment: "Research Methodology",
          score: 97,
          date: "2026-08-24"
        }
      ]
    },

    activity: {
      lastActive: "2026-09-09",
      learningHours: 76,
      coursesInProgress: 1
    }
  },

  {
    id: 7,
    name: "Karan Joshi",
    email: "karan.joshi@example.com",
    phone: "+91 9712345678",
    role: "trainee",
    status: "Pending",
    joinedDate: "2026-09-08",

    qualification: "BCA",
    institution: "University of Rajasthan",
    workExperience: 0,

    skills: ["HTML", "CSS", "JavaScript"],
    interests: ["Web Development", "UI/UX"],

    learning: {
      enrolledCourses: [],
      completedCourses: 0,
      certificates: []
    },

    performance: {
      totalPerformance: 0,
      completionRate: 0,
      assessmentsCompleted: 0,
      assessmentsTotal: 0,
      recentPerformance: []
    },

    activity: {
      lastActive: "2026-09-08",
      learningHours: 0,
      coursesInProgress: 0
    }
  },

  {
    id: 8,
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    phone: "+91 9867123456",
    role: "trainee",
    status: "Inactive",
    joinedDate: "2026-04-21",

    qualification: "B.Sc Computer Science",
    institution: "Amity University",
    workExperience: 1,

    skills: ["Python", "SQL", "Excel"],
    interests: ["Data Analytics", "Artificial Intelligence"],

    learning: {
      enrolledCourses: [
        {
          courseId: 115,
          title: "Data Analytics Fundamentals",
          progress: 43,
          status: "In Progress"
        }
      ],
      completedCourses: 0,
      certificates: []
    },

    performance: {
      totalPerformance: 64,
      completionRate: 41,
      assessmentsCompleted: 4,
      assessmentsTotal: 8,

      recentPerformance: [
        {
          assessment: "Data Analytics Basics",
          score: 61,
          date: "2026-08-12"
        },
        {
          assessment: "SQL Fundamentals",
          score: 67,
          date: "2026-08-05"
        },
        {
          assessment: "Excel for Data Analysis",
          score: 64,
          date: "2026-07-28"
        }
      ]
    },

    activity: {
      lastActive: "2026-08-15",
      learningHours: 19,
      coursesInProgress: 1
    }
  }
];

export default trainees;