require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('../models/User');
const Job = require('../models/Job');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});

    console.log('Cleared existing data');

    // Create sample employers
    const employer1 = await User.create({
      name: 'Tech Solutions Bangalore',
      email: 'employer1@techsolutions.com',
      password: 'password123',
      role: 'employer',
      company: 'Tech Solutions Pvt Ltd',
      location: 'Whitefield',
      phone: '+91 9876543210'
    });

    const employer2 = await User.create({
      name: 'Innovate Labs',
      email: 'employer2@innovatelabs.com',
      password: 'password123',
      role: 'employer',
      company: 'Innovate Labs India',
      location: 'Koramangala',
      phone: '+91 9876543211'
    });

    const employer3 = await User.create({
      name: 'Digital Dynamics',
      email: 'employer3@digitaldynamics.com',
      password: 'password123',
      role: 'employer',
      company: 'Digital Dynamics Corp',
      location: 'Indiranagar',
      phone: '+91 9876543212'
    });

    console.log('Created sample employers');

    // Create sample job seekers
    const jobSeeker1 = await User.create({
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      password: 'password123',
      role: 'job_seeker',
      location: 'HSR Layout',
      phone: '+91 9876543213',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: 3
    });

    const jobSeeker2 = await User.create({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: 'password123',
      role: 'job_seeker',
      location: 'Koramangala',
      phone: '+91 9876543214',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      experience: 2
    });

    console.log('Created sample job seekers');

    // Create sample jobs
    const jobs = [
      {
        title: 'Senior React Developer',
        company: 'Tech Solutions Pvt Ltd',
        description: 'We are looking for an experienced React developer to join our team in Whitefield. You will be working on cutting-edge web applications for our clients across various industries.',
        location: 'Whitefield',
        salaryMin: 800000,
        salaryMax: 1200000,
        experienceRequired: 3,
        category: 'Software Development',
        jobType: 'Full-time',
        skills: ['React', 'JavaScript', 'Redux', 'TypeScript'],
        employer: employer1._id,
        status: 'active'
      },
      {
        title: 'Full Stack Developer',
        company: 'Tech Solutions Pvt Ltd',
        description: 'Join our dynamic team as a Full Stack Developer. You will work on both frontend and backend technologies including React, Node.js, and MongoDB.',
        location: 'Whitefield',
        salaryMin: 600000,
        salaryMax: 1000000,
        experienceRequired: 2,
        category: 'Software Development',
        jobType: 'Full-time',
        skills: ['React', 'Node.js', 'MongoDB', 'Express'],
        employer: employer1._id,
        status: 'active'
      },
      {
        title: 'Data Scientist',
        company: 'Innovate Labs India',
        description: 'We are seeking a talented Data Scientist to analyze complex datasets and build machine learning models. Experience with Python, TensorFlow, and statistical analysis required.',
        location: 'Koramangala',
        salaryMin: 1000000,
        salaryMax: 1500000,
        experienceRequired: 4,
        category: 'Data Science',
        jobType: 'Full-time',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Statistics'],
        employer: employer2._id,
        status: 'active'
      },
      {
        title: 'UI/UX Designer',
        company: 'Digital Dynamics Corp',
        description: 'Creative UI/UX Designer needed to design beautiful and intuitive user interfaces for our mobile and web applications.',
        location: 'Indiranagar',
        salaryMin: 500000,
        salaryMax: 800000,
        experienceRequired: 2,
        category: 'Design',
        jobType: 'Full-time',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
        employer: employer3._id,
        status: 'active'
      },
      {
        title: 'Product Manager',
        company: 'Innovate Labs India',
        description: 'Looking for an experienced Product Manager to lead product development and work closely with engineering and design teams.',
        location: 'Koramangala',
        salaryMin: 1500000,
        salaryMax: 2000000,
        experienceRequired: 5,
        category: 'Product Management',
        jobType: 'Full-time',
        skills: ['Product Strategy', 'Agile', 'User Stories', 'Roadmap Planning'],
        employer: employer2._id,
        status: 'active'
      },
      {
        title: 'DevOps Engineer',
        company: 'Tech Solutions Pvt Ltd',
        description: 'DevOps Engineer to manage our cloud infrastructure, CI/CD pipelines, and ensure high availability of our services.',
        location: 'Whitefield',
        salaryMin: 900000,
        salaryMax: 1300000,
        experienceRequired: 3,
        category: 'Software Development',
        jobType: 'Full-time',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
        employer: employer1._id,
        status: 'active'
      },
      {
        title: 'Marketing Manager',
        company: 'Digital Dynamics Corp',
        description: 'Marketing Manager to develop and execute marketing strategies for our products. Experience in digital marketing and B2B marketing required.',
        location: 'Indiranagar',
        salaryMin: 700000,
        salaryMax: 1100000,
        experienceRequired: 4,
        category: 'Marketing',
        jobType: 'Full-time',
        skills: ['Digital Marketing', 'SEO', 'Content Marketing', 'Analytics'],
        employer: employer3._id,
        status: 'active'
      },
      {
        title: 'Junior Python Developer',
        company: 'Innovate Labs India',
        description: 'Entry-level Python developer position for fresh graduates or developers with 1 year of experience. Training will be provided.',
        location: 'Koramangala',
        salaryMin: 400000,
        salaryMax: 600000,
        experienceRequired: 0,
        category: 'Software Development',
        jobType: 'Full-time',
        skills: ['Python', 'Django', 'REST APIs'],
        employer: employer2._id,
        status: 'active'
      },
      {
        title: 'Sales Executive',
        company: 'Digital Dynamics Corp',
        description: 'Sales Executive to drive B2B sales for our software products. Great opportunity for sales professionals in the tech industry.',
        location: 'MG Road',
        salaryMin: 500000,
        salaryMax: 800000,
        experienceRequired: 2,
        category: 'Sales',
        jobType: 'Full-time',
        skills: ['B2B Sales', 'Negotiation', 'CRM', 'Client Management'],
        employer: employer3._id,
        status: 'active'
      },
      {
        title: 'HR Manager',
        company: 'Tech Solutions Pvt Ltd',
        description: 'HR Manager to oversee recruitment, employee relations, and HR operations for our growing team.',
        location: 'Whitefield',
        salaryMin: 600000,
        salaryMax: 900000,
        experienceRequired: 5,
        category: 'HR',
        jobType: 'Full-time',
        skills: ['Recruitment', 'Employee Relations', 'HR Policies', 'Talent Management'],
        employer: employer1._id,
        status: 'active'
      },
      {
        title: 'Frontend Developer Intern',
        company: 'Innovate Labs India',
        description: 'Internship opportunity for students or recent graduates to learn frontend development with React and modern web technologies.',
        location: 'Koramangala',
        salaryMin: 180000,
        salaryMax: 240000,
        experienceRequired: 0,
        category: 'Software Development',
        jobType: 'Internship',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        employer: employer2._id,
        status: 'active'
      },
      {
        title: 'QA Engineer',
        company: 'Digital Dynamics Corp',
        description: 'Quality Assurance Engineer to test our applications and ensure high-quality software delivery. Manual and automation testing experience preferred.',
        location: 'Indiranagar',
        salaryMin: 500000,
        salaryMax: 750000,
        experienceRequired: 2,
        category: 'Software Development',
        jobType: 'Full-time',
        skills: ['Manual Testing', 'Selenium', 'Test Automation', 'JIRA'],
        employer: employer3._id,
        status: 'active'
      }
    ];

    await Job.insertMany(jobs);

    console.log('Created sample jobs');
    console.log('\n=== Sample Credentials ===');
    console.log('Employer 1: employer1@techsolutions.com / password123');
    console.log('Employer 2: employer2@innovatelabs.com / password123');
    console.log('Employer 3: employer3@digitaldynamics.com / password123');
    console.log('Job Seeker 1: rajesh@example.com / password123');
    console.log('Job Seeker 2: priya@example.com / password123');
    console.log('\nDatabase seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
