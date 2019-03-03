var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    const data = {
        data: {
            name: "Daniel Ibanez",
            city: "SC Tenerife",
            description: "Spanjor som försöker förstå sig på Sverige. "
                + "Gillar programmering och podcasts mitt i natten."
        }
    };

    res.json(data);
});

module.exports = router;
