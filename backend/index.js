const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./Routes/AuthRoutes');
const cors = require('cors');


const stripe = require('stripe')("sk_test_51LEvO5IeJ1VHzlQPWfAVQhwbZpTpEiYeEQ6tuayLGJ8wSEDK41bavVCn9W574vOf0k903lPSh73MOOIfoIldIh9800K4HIKwNE");
const bodyParser = require("body-parser")

app.listen(4000, () => {
    console.log("Server Started")
})

mongoose.connect("mongodb+srv://ilia2002:iliko2002@cluster0.lwa3n.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection established to MongoDB")
}).catch((err) => {
    console.log(err.message);
})

app.post("/payment/:amount/:id", cors(), async (req, res) => {
    const { amount, id } = req.params
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Company",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment Successfully",
            success: true
        })

    } catch (error) {
        console.log('Error', error)
        res.json({
            message: "Payment Failed",
            success: false
        })

    }

})

app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.json())
app.use("/", authRoutes)
