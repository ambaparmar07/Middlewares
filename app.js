const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// app.use((req, res) => {
//     let { query } = req.query;
//     console.log(query);
//     console.log("Hi, I am middleware");
//     res.send("middleware finished");
// });

// app.use((req, res, next) => {
//     console.log("Hi, I am 1st middleware");
//     next();
// });

// app.use("/random", (req, res, next) => {
//     console.log("I am only for random");
// });

// app.use((req, res, next) => {
//     console.log("Hi, I am 2nd middleware");
//     next();
// });

// app.use("/api", (req, res, next) => {
//     let  {token} = req.query;
//     if (token === "giveaccess") {
//         next();
//     }
//     res.send("ACCESS DENIED!");
// })

// app.get("/api", (req, res) => {
//     res.send("data");
// });

const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/api", checkToken, (req, res) => {
    res.send("data");
});

app.get("/", (req, res) => {
    res.send("Hi, I am root.");
});

app.get("/random", (req, res) => {
    res.send("this is a random page");
});

// app.use((req, res, next) => {
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });

app.get("/err", (req, res) => {
    abcd = abcd;
});

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Access to admin is Forbidden")
})

app.use((err, req, res, next) => {
    //console.log("------ERROR------");
    let { status = 500, message = "Some Error Occurred"} = err;
    // next(err);
    res.status(status).send(message);
});

//404
// app.use((req, res) => {
//     res.status(404).send("Page not found")
// })

app.listen(8080, () => {
    console.log("server listening to port 8080");
})