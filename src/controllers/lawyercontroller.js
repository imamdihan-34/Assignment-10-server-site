const User = require('../models/User');
const Lawyer = require('../models/Lawyer');

// Get all lawyers
exports.getAllLawyers = async (req, res) => {
  try {
    let lawyers = await Lawyer.find().populate('userId', 'fullName email profilePicture').exec();
    
    // যদি empty হয়, dummy data return করো
    if (lawyers.length === 0) {
      lawyers = [
        {
          _id: '1',
          fullName: 'John Smith',
          specialization: 'Criminal Law',
          experience: 15,
          hourlyRate: 250,
          bio: 'Expert in criminal defense',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer1',
          isFeatured: true,
          averageRating: 4.8,
          totalHirings: 45
        },
        {
          _id: '2',
          fullName: 'Sarah Johnson',
          specialization: 'Corporate Law',
          experience: 12,
          hourlyRate: 300,
          bio: 'Specializes in corporate contracts',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer2',
          isFeatured: true,
          averageRating: 4.9,
          totalHirings: 38
        },
        {
          _id: '3',
          fullName: 'Mike Davis',
          specialization: 'Family Law',
          experience: 10,
          hourlyRate: 200,
          bio: 'Handles divorce and custody cases',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer3',
          isFeatured: true,
          averageRating: 4.7,
          totalHirings: 52
        }
      ];
    }
    
    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({ message: 'Error fetching lawyers' });
  }
};

// Get featured lawyers
exports.getFeaturedLawyers = async (req, res) => {
  try {
    let lawyers = await Lawyer.find({ isFeatured: true })
      .limit(6)
      .populate('userId', 'fullName email profilePicture')
      .exec();

    // Dummy data যদি empty হয়
    if (lawyers.length === 0) {
      lawyers = [
        {
          _id: '1',
          fullName: 'John Smith',
          specialization: 'Criminal Law',
          experience: 15,
          hourlyRate: 250,
          bio: 'Expert in criminal defense',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer1',
          isFeatured: true,
          averageRating: 4.8,
          totalHirings: 45
        },
        {
          _id: '2',
          fullName: 'Sarah Johnson',
          specialization: 'Corporate Law',
          experience: 12,
          hourlyRate: 300,
          bio: 'Specializes in corporate contracts',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer2',
          isFeatured: true,
          averageRating: 4.9,
          totalHirings: 38
        },
        {
          _id: '3',
          fullName: 'Mike Davis',
          specialization: 'Family Law',
          experience: 10,
          hourlyRate: 200,
          bio: 'Handles divorce and custody cases',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer3',
          isFeatured: true,
          averageRating: 4.7,
          totalHirings: 52
        }
      ];
    }

    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching featured lawyers:', error);
    res.status(500).json({ message: 'Error fetching featured lawyers' });
  }
};

// Get top lawyers
exports.getTopLawyers = async (req, res) => {
  try {
    let lawyers = await Lawyer.find()
      .sort({ averageRating: -1 })
      .limit(6)
      .populate('userId', 'fullName email profilePicture')
      .exec();

    // Dummy data যদি empty হয়
    if (lawyers.length === 0) {
      lawyers = [
        {
          _id: '4',
          fullName: 'Emily Wilson',
          specialization: 'Tax Law',
          experience: 18,
          hourlyRate: 350,
          bio: 'Top tax consultant',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer4',
          isFeatured: false,
          averageRating: 5.0,
          totalHirings: 60
        },
        {
          _id: '5',
          fullName: 'James Brown',
          specialization: 'Real Estate',
          experience: 14,
          hourlyRate: 280,
          bio: 'Real estate legal expert',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer5',
          isFeatured: false,
          averageRating: 4.9,
          totalHirings: 55
        },
        {
          _id: '6',
          fullName: 'Lisa Anderson',
          specialization: 'IP Law',
          experience: 11,
          hourlyRate: 320,
          bio: 'Intellectual property specialist',
          profilePicture: 'https://via.placeholder.com/150?text=Lawyer6',
          isFeatured: false,
          averageRating: 4.8,
          totalHirings: 42
        }
      ];
    }

    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching top lawyers:', error);
    res.status(500).json({ message: 'Error fetching top lawyers' });
  }
};

// Get lawyer by ID
exports.getLawyerById = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id).populate('userId').exec();
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });
    res.json(lawyer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lawyer' });
  }
};