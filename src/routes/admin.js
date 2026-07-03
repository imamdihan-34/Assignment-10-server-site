const express = require("express");

const router = express.Router();

const {

    getAllUsers,
    changeRole,
    deleteUser,
    getAnalytics,
    getAllTransactions,

} = require("../controllers/adminController");

const {

    verifyToken,
    verifyAdmin,

} = require("../middleware/auth");

router.use(
    verifyToken,
    verifyAdmin
);

router.get(
    "/users",
    getAllUsers
);

router.patch(
    "/users/:id/role",
    changeRole
);

router.delete(
    "/users/:id",
    deleteUser
);

router.get(
    "/analytics",
    getAnalytics
);

router.get(
    "/transactions",
    getAllTransactions
);

module.exports = router;