exports.emptyBody = (req, res, next) => {
    if(Object.keys(req.body).length === 0 && req.body.constructor === Object){
        return res.status(400).send({error: "Invalid Request"});
    } else {
        for(var i=0; i<(Object.keys(req.body).length); i++){
            if(req.body[Object.keys(req.body)[i]]==''){
                return res.status(400).send({error: Object.keys(req.body)[i]+' is required'});
            }
        }
        return next();
    }
}