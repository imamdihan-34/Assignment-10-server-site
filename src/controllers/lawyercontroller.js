const User = require("../models/User");
const Lawyer = require("../models/Lawyer");

// Get all lawyers
// Get featured lawyers
// Get lawyer by ID
const getFeaturedLawyers = async (req, res) => {
  try {
    const dummyLawyers = [
      {
        _id: "1",
        fullName: "John Smith",
        specialization: "Criminal Law",
        experience: 15,
        hourlyRate: 250,
        bio: "Expert in criminal defense with 15 years of experience.",
        profilePicture: "https://i.pravatar.cc/150?img=1",
        isFeatured: true,
        averageRating: 4.8,
        totalHirings: 45,
      },
      {
        _id: "2",
        fullName: "Sarah Johnson",
        specialization: "Corporate Law",
        experience: 12,
        hourlyRate: 300,
        bio: "Specializes in corporate contracts and M&A.",
        profilePicture: "https://i.pravatar.cc/150?img=2",
        isFeatured: true,
        averageRating: 4.9,
        totalHirings: 38,
      },
      {
        _id: "3",
        fullName: "Mike Davis",
        specialization: "Family Law",
        experience: 10,
        hourlyRate: 200,
        bio: "Handles divorce and custody cases.",
        profilePicture: "https://i.pravatar.cc/150?img=3",
        isFeatured: true,
        averageRating: 4.7,
        totalHirings: 52,
      },
    ];
    console.log("Login Response =>", {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });

    res.json(dummyLawyers);
  } catch (error) {
    console.error("Error fetching featured lawyers:", error);
    res.status(500).json({ message: "Error fetching featured lawyers" });
  }
};

const getTopLawyers = async (req, res) => {
  try {
    const dummyLawyers = [
      {
        _id: "4",
        fullName: "Emily Wilson",
        specialization: "Tax Law",
        experience: 18,
        hourlyRate: 350,
        bio: "Top tax consultant.",
        profilePicture: "https://i.pravatar.cc/150?img=4",
        isFeatured: false,
        averageRating: 5.0,
        totalHirings: 60,
      },
      {
        _id: "5",
        fullName: "James Brown",
        specialization: "Real Estate",
        experience: 14,
        hourlyRate: 280,
        bio: "Real estate legal expert.",
        profilePicture: "https://i.pravatar.cc/150?img=5",
        isFeatured: false,
        averageRating: 4.9,
        totalHirings: 55,
      },
      {
        _id: "6",
        fullName: "Lisa Anderson",
        specialization: "IP Law",
        experience: 11,
        hourlyRate: 320,
        bio: "Intellectual property specialist.",
        profilePicture: "https://i.pravatar.cc/150?img=6",
        isFeatured: false,
        averageRating: 4.8,
        totalHirings: 42,
      },
    ];

    res.json(dummyLawyers);
  } catch (error) {
    console.error("Error fetching top lawyers:", error);
    res.status(500).json({ message: "Error fetching top lawyers" });
  }
};

const getAllLawyers = async (req, res) => {
  try {
    const dummyLawyers = [
      {
        _id: "1",
        fullName: "John Smith",
        specialization: "Criminal Law",
        experience: 15,
        hourlyRate: 250,
        bio: "Expert in criminal defense.",
        profilePicture: "https://i.pravatar.cc/150?img=1",
        isFeatured: true,
        averageRating: 4.8,
        totalHirings: 45,
      },
      {
        _id: "2",
        fullName: "Sarah Johnson",
        specialization: "Corporate Law",
        experience: 12,
        hourlyRate: 300,
        bio: "Specializes in corporate contracts.",
        profilePicture: "https://i.pravatar.cc/150?img=2",
        isFeatured: true,
        averageRating: 4.9,
        totalHirings: 38,
      },
      {
        _id: "3",
        fullName: "Mike Davis",
        specialization: "Family Law",
        experience: 10,
        hourlyRate: 200,
        bio: "Handles divorce and custody cases.",
        profilePicture: "https://i.pravatar.cc/150?img=3",
        isFeatured: true,
        averageRating: 4.7,
        totalHirings: 52,
      },
      {
        _id: "4",
        fullName: "Emily Wilson",
        specialization: "Tax Law",
        experience: 18,
        hourlyRate: 350,
        bio: "Top tax consultant.",
        profilePicture: "https://i.pravatar.cc/150?img=4",
        isFeatured: false,
        averageRating: 5.0,
        totalHirings: 60,
      },
      {
        _id: "5",
        fullName: "James Brown",
        specialization: "Real Estate",
        experience: 14,
        hourlyRate: 280,
        bio: "Real estate legal expert.",
        profilePicture: "https://i.pravatar.cc/150?img=5",
        isFeatured: false,
        averageRating: 4.9,
        totalHirings: 55,
      },
      {
        _id: "6",
        fullName: "Lisa Anderson",
        specialization: "IP Law",
        experience: 11,
        hourlyRate: 320,
        bio: "Intellectual property specialist.",
        profilePicture: "https://i.pravatar.cc/150?img=6",
        isFeatured: false,
        averageRating: 4.8,
        totalHirings: 42,
      },
    ];

    res.json(dummyLawyers);
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    res.status(500).json({ message: "Error fetching lawyers" });
  }
};

const getLawyerById = async (req, res) => {
  try {
    const { id } = req.params;

    const allLawyers = [
      {
        _id: "1",
        fullName: "John Smith",
        specialization: "Criminal Law",
        experience: 15,
        hourlyRate: 250,
        bio: "Expert in criminal defense.",
        profilePicture: "https://i.pravatar.cc/150?img=1",
        isFeatured: true,
        averageRating: 4.8,
        totalHirings: 45,
      },
      {
        _id: "2",
        fullName: "Sarah Johnson",
        specialization: "Corporate Law",
        experience: 12,
        hourlyRate: 300,
        bio: "Specializes in corporate contracts.",
        profilePicture: "https://i.pravatar.cc/150?img=2",
        isFeatured: true,
        averageRating: 4.9,
        totalHirings: 38,
      },
      {
        _id: "3",
        fullName: "Mike Davis",
        specialization: "Family Law",
        experience: 10,
        hourlyRate: 200,
        bio: "Handles divorce and custody cases.",
        profilePicture: "https://i.pravatar.cc/150?img=3",
        isFeatured: true,
        averageRating: 4.7,
        totalHirings: 52,
      },
      {
        _id: "4",
        fullName: "Emily Wilson",
        specialization: "Tax Law",
        experience: 18,
        hourlyRate: 350,
        bio: "Top tax consultant.",
        profilePicture: "https://i.pravatar.cc/150?img=4",
        isFeatured: false,
        averageRating: 5.0,
        totalHirings: 60,
      },
      {
        _id: "5",
        fullName: "James Brown",
        specialization: "Real Estate",
        experience: 14,
        hourlyRate: 280,
        bio: "Real estate legal expert.",
        profilePicture: "https://i.pravatar.cc/150?img=5",
        isFeatured: false,
        averageRating: 4.9,
        totalHirings: 55,
      },
      {
        _id: "6",
        fullName: "Lisa Anderson",
        specialization: "IP Law",
        experience: 11,
        hourlyRate: 320,
        bio: "Intellectual property specialist.",
        profilePicture: "https://i.pravatar.cc/150?img=6",
        isFeatured: false,
        averageRating: 4.8,
        totalHirings: 42,
      },
    ];

    const lawyer = allLawyers.find((l) => l._id === id);

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    res.json(lawyer);
  } catch (error) {
    console.error("Error fetching lawyer:", error);
    res.status(500).json({ message: "Error fetching lawyer" });
  }
};

module.exports = {
  getFeaturedLawyers,
  getTopLawyers,
  getAllLawyers,
  getLawyerById,
};
