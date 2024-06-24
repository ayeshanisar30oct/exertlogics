export default async function handler(req, res) {
    if(req.method === 'GET'){
        res.status(200).json({status : 'success', message : "Hello NEXT.js!"})
    }
    else {
        res.status(404).json({status : 'fail', message : `${req.method} method not allowed for this endpoint`})
    }
}