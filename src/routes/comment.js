const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/auth');
 
router.get('/lawyer/:lawyerId', commentController.getCommentsByLawyer);
router.get('/my-comments', verifyToken, commentController.getMyComments);
 
router.post('/create', verifyToken, commentController.createComment);
router.put('/:id', verifyToken, commentController.updateComment);
router.delete('/:id', verifyToken, commentController.deleteComment);
 
module.exports = router;
 