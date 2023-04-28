const express = require('express')

const router = express.Router()

const {
    addFeedback,
    getAllFeedbacks,
    deleteFeedback
} = require('../controllers/feedbackController')

/// midlleware

/// Routes

// add a feedback
router.post('/', addFeedback)

// get All feedbacks
router.get('/', getAllFeedbacks)

// Delete a feedback
router.delete('/:id', deleteFeedback)

module.exports = router