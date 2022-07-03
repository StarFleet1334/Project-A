const UserModel = require('../Models/UserModel')


module.exports.register = async (req, res, next) => {
    try {
        const { email, nick } = req.params;
        const user = await UserModel.create({ email, nick, });
        res.status(201).json("Did it")
    } catch (err) {
        console.log(err)
    }
}

module.exports.add = async (req, res, next) => {
    const { email, amount } = req.params
    const { id, price, colors, category, images, name, description, company } = req.body;
    try {
        UserModel.updateOne(
            { email: email },
            { $push: { products: { id, price, colors, category, images, name, description, company, amount } } }
        ).then((data) => console.log(data));
    } catch (err) {
        console.log(err);
    }
}

module.exports.clear = async (req, res, next) => {
    const { email } = req.params;
    try {
        UserModel.updateOne(
            { email: email },
            { $set: { products: [] } }
        ).then((data) => console.log(data));
    } catch (err) {
        console.log(err);
    }
}

module.exports.remove = async (req, res, next) => {
    const { email, id } = req.params;
    try {
        UserModel.updateOne(
            { email: email },
            { $pull: { products: { id: id } } }
        ).then((data) => console.log(data));
    } catch (err) {
        console.log(err);
    }
}

module.exports.handleIncrease = async (req, res, next) => {
    const { amount, max } = req.params;
    const { id, email } = req.body;
    let newValue = parseInt(amount) + 1;
    if (newValue >= parseInt(max)) {
        newValue = parseInt(max);
    }
}

module.exports.dec = async (req, res, next) => {
    const { amount, id } = req.params;
    const { email } = req.body;
    let newValue = amount
    if (newValue <= 1) {
        newValue = 1
    } else {
        newValue = amount - 1
    }
}


module.exports.success = async (req, res, next) => {
    const { email } = req.params;
    try {
        UserModel.updateOne(
            { email: email },
            { $set: { purchased: true } }
        ).then((data) => console.log(data))
    } catch (err) {
        console.log(err)
    }
}