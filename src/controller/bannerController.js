// banner added
const bannerController = async (req, res, next) => {
  console.log(req.body);
  
  res.send(req.file)

}


module.exports = { bannerController }