export default (err, req, res, next) => {
    console.log("estamos en el error handler")
    console.log(err.stack)
    return res.status(500).json({
        status: 500,
        method: req.method,
        path: req.url,
        response: err.message
    })
}
