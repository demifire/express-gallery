knex = require('../knex/knex.js');
Photos = require('../knex/models/Photos');
const photoList = 0;

// Fetches all objects in the database items array
function showAll () {
    Photos
      .fetchAll()
      .then(results => {
        return results.toJSON();
      })
      .catch(err => {
        console.log(err, 'err');
      })
}

function showRandom () {
  loadDatabase();
    // first grab the array and load it into cache
    tempArr = [];
    for(var i=0;i<3;i++){
    let item = photoList[Math.floor(Math.random()*photoList.length)];
    let spliceIndex = findTheIndex(item.id);
    let splicedItem = photoList.splice(spliceIndex, 1);
    tempArr.push(splicedItem[0]);
    }
    return tempArr
    
}

function findTheIndex(id) {
  return showAll().findIndex((element, index) => {
    return element.id === Number(id);
  })
}

function loadDatabase() {
  return Photos
    .fetchAll()
    .then(results => {
      photoList = results.toJSON();
    })
    .catch(err => {
      console.log(err, 'err');
    })
}

module.exports = {
    showAll,
    showRandom,
    findTheIndex,
    loadDatabase
}