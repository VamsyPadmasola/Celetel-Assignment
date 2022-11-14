const express = require('express');
const { createCustomer, getCustomers, removeCustomer, updateCustomer, searchCustomer } = require('../controllers/customer');
const { isAuth } = require('../middlewares/auth');
const { validatePassword, customerValidator } = require('../middlewares/validator');
const { validate } = require('../middlewares/validator');
const router = express.Router()

router.post("/create", validate, createCustomer);
router.get('/customers', isAuth, getCustomers)
router.delete('/:customerId', isAuth, removeCustomer)
router.post(
    "/update/:customerId",
    isAuth,
    validate,
    updateCustomer
);

router.get('/search', isAuth, searchCustomer)
module.exports = router; 
