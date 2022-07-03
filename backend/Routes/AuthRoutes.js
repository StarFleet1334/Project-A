
const { register, add, clear, remove, handleIncrease, dec, success } = require("../Controllers/AuthControllers")
const router = require('express').Router();

router.post('/register/:email/:nick', register)
router.post('/add/:email/:amount', add)
router.post('/clear/:email', clear)
router.post('/remove/:email/:id', remove)
router.post('/dec/:amount/:id', dec);
router.post('/increase/:amount/:max', handleIncrease)
router.post('/good/:email', success)

module.exports = router;