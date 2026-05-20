export type TeamMember = {
    name: string;
    role: string;
    department: string;
    image?: string;
    bio: string;
    skills: string[];
    email?: string;
    linkedin?: string;
};

export const team: TeamMember[] = [
    {
        name: "Hamad Shahid",
        role: "CEO",
        department: "Leadership",
        image: "/my%20team/CEO.jpeg",
        bio: "Hamad leads the company vision, partnerships, and long-term strategy. He focuses on growth, innovation, and building strong client relationships that drive lasting impact.",
        skills: ["Leadership", "Business Strategy", "Product Vision", "Partnerships"],
        email: "hamad@giantsoftech.com",
        linkedin: "#",
    },
    {
        name: "Muhammad Saad",
        role: "Head of Development",
        department: "Engineering",
        image: "/my%20team/HOD%20of%20development.jpeg",
        bio: "Muhammad oversees the engineering team and ensures every product is built with performance, security, and scalability in mind — from architecture to deployment.",
        skills: ["System Architecture", "Team Leadership", "Code Review", "Cloud Infrastructure"],
        email: "saad@giantsoftech.com",
        linkedin: "#",
    },
    {
        name: "Zohaib Alam",
        role: "Senior Software Engineer",
        department: "Engineering",
        image: "/my%20team/senior%20software%20engineer.jpeg",
        bio: "Zohaib specialises in building robust web applications, backend systems, API integrations, and clean engineering practices across every project.",
        skills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
        email: "zohaibe840@gmail.com",
    },
    {
        name: "Syed Ashir",
        role: "Admin Officer",
        department: "Operations",
        image: "/my%20team/Admin.jpeg",
        bio: "Syed handles internal coordination, scheduling, documentation, and daily administrative operations that keep the team organised, efficient, and always moving forward.",
        skills: ["Administration", "Scheduling", "Documentation", "Communication"],
        email: "ashir@giantsoftech.com",
    },
    {
        name: "Hamza Pervez",
        role: "Accounts Officer",
        department: "Finance",
        image: "/my%20team/accounting.jpeg",
        bio: "Hamza manages invoicing, expense tracking, and financial records while helping the company maintain accurate, transparent, and reliable accounting processes.",
        skills: ["Accounting", "Bookkeeping", "Financial Records", "Reporting"],
        email: "hamza@giantsoftech.com",
    },
    {
        name: "Maya Bennett",
        role: "AI Analyst",
        department: "Technology",
        bio: "Maya works on AI-driven insights, data interpretation, and workflow automation — turning raw information into smart business decisions with precision.",
        skills: ["AI Analysis", "Prompt Design", "Data Insights", "Automation", "Research"],
        email: "maya@giantsoftech.com",
        linkedin: "#",
    },
];
