const Promise = require('bluebird');

module.exports = {
  get: function() {
    return new Promise((resolve, reject) => {
      const listing = {
        "id":199,
        "url":"mockUrl",
        "title":"nostrum laboriosam in rerum officiis",
        "type":"Shared Room",
        "numBeds":2,
        "price":810,
        "numRatings":965,
        "avgStars":0.5,
        "thumbnailImage":"mockImageUrl"
      };
      resolve({
        data: new Array(10).fill(listing)
      });
    })
  }
}