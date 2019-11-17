const fs = require('fs');
export default (req, res) => {
  res.send(fs.readFileSync('./sitemap.xml'))
}
