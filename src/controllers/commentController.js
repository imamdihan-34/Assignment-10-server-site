
const Comment = require('../models/Comment');
 
const createComment = async (req, res) => {
  try {
    const { lawyerId, comment } = req.body;
    const userId = req.userId;
 
    const newComment = new Comment({
      userId,
      lawyerId,
      comment
    });
 
    await newComment.save();
 
    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};
 
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
 
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment, updatedAt: new Date() },
      { new: true }
    );
 
    res.json({
      message: 'Comment updated successfully',
      comment: updatedComment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment', error: error.message });
  }
};
 
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
 
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error: error.message });
  }
};
 
const getCommentsByLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.params;
 
    const comments = await Comment.find({ lawyerId })
      .populate('userId', 'fullName profilePicture')
      .sort({ createdAt: -1 });
 
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};
 
const getMyComments = async (req, res) => {
  try {
    const userId = req.userId;
 
    const comments = await Comment.find({ userId })
      .populate({
        path: 'lawyerId',
        populate: { path: 'userId', select: 'fullName specialization' }
      })
      .sort({ createdAt: -1 });
 
    const commentList = comments.map(c => ({
      _id: c._id,
      comment: c.comment,
      lawyerId: {
        _id: c.lawyerId._id,
        fullName: c.lawyerId.userId.fullName,
        specialization: c.lawyerId.specialization
      },
      createdAt: c.createdAt
    }));
 
    res.json(commentList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};
 
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByLawyer,
  getMyComments
};