const fs = require('fs');
export default (req, res) => {
  fs.readFileSync('./sitemap.xml');
  res.send(fs.readFileSync('./sitemap.xml'))
}
