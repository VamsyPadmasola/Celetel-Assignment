
const Customer = require("../models/customer")
const { isValidObjectId } = require("mongoose");
const { sendError, formatCustomer } = require("../uitls/helper");

exports.createCustomer = async (req, res) => {
    const { name, email, contact, company } = req.body

    console.log(name)

    const oldCustomer = await Customer.findOne({ email })

    if (oldCustomer) return sendError(res, "This email is already in use.");

    const newCustomer = new Customer({ name: name, email: email, contact: contact, company: company });
    await newCustomer.save()

    res.status(201).json({ customer: formatCustomer(newCustomer) })
};

exports.removeCustomer = async (req, res) => {
    const { customerId } = req.params
    if (!isValidObjectId(customerId))
        return sendError(res, 'Invalid request!')
    const customer = await Customer.findById(customerId)
    if (!customer)
        return sendError(res, 'Invalid request, record not found!')

    await Customer.findByIdAndDelete(customerId)
    res.json({ message: "Record removed Successfully!" })
}

exports.updateCustomer = async (req, res) => {
    const { name, email, contact, company } = req.body;
    const { customerId } = req.params

    if (!isValidObjectId(customerId))
        return sendError(res, 'Invalid request!')

    const customer = await Customer.findById(customerId)
    if (!customer)
        return sendError(res, 'Invalid request, record not found!')

    customer.name = name
    customer.email = email
    customer.contact = contact
    customer.company = company

    await customer.save()
    res.status(201).json({ customer: formatCustomer(customer) })
}

exports.searchCustomer = async (req, res) => {
    const { name, pageNo = 0, limit = 4 } = req.query

    if (!name.trim()) return sendError(res, 'Invalid Request')
    // const result = await Actor.find({ $text: { $search: `"${query.name}"` } })
    const result = await Customer.find({ name: { $regex: name, $options: 'i' } })
        .sort({ createdAt: -1 })
        .skip(parseInt(pageNo) * parseInt(limit))
        .limit(parseInt(limit));

    const customers = result.map(customer => formatCustomer(customer))
    res.json({ results: customers })
}

exports.getCustomers = async (req, res) => {
    const { pageNo = 0, limit = 4 } = req.query;

    const customers = await Customer.find({})
        .sort({ createdAt: -1 })
        .skip(parseInt(pageNo) * parseInt(limit))
        .limit(parseInt(limit));

    const profiles = customers.map((customer) => formatCustomer(customer))
    res.json({
        profiles,
    })
}