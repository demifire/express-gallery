class Users {
    constructor() {
      this.knex = require('../knex/knex.js');
      this._itemsCreated = 3;
      this._itemDeletedArr = [];
    }
  
  loadDatabase() {
    return this.knex.raw('SELECT * FROM items');
  }
  
  // Refreshes all objects in the database items array
  showAll () {
    this.knex.raw('SELECT * FROM items')
    .then( results => {
      this._userList = results.rows;
      this._userNumber = this._userList.length;
      return results;
    })
    .catch( err => {
      console.log('error', err)
    });
    return this._userList;
  }
  
  refreshID (id) {
    return this.knex.raw(`SELECT * FROM items WHERE id = ${id}`)
  }
  
  // Just returns the product list
  showList () {
    return this._userList
  }
  
  // First checks if the product already exists, and if it does, it does not create
  createUser(data) {
    if (this.checkIfUserExists(data.id)) {
      return false;
    } else {
      this._userNumber += 1;
      this._itemsCreated += 1;
      this.knex.raw('INSERT INTO items (id, creationid, name, price, inventory) VALUES (' + this._productNumber + ',' + this._itemsCreated + ',' + "'" + data.name + "'" + ',' + Number(data.price) + ',' + Number(data.inventory) + ')')
        .then( userAdded => {
          return userAdded
        })
        .catch( err => {
          console.log(err);
        })
  
      return true;
    }
  }
  
  // Checks if the element exists in the cache
  checkIfUserExists(id) {
    if (this.showAll() === undefined) {
      return false
    } else {
      return this.showAll().some(element => {
        if (element.id === Number(id)) {
          return true;
        } else {
          return false;
        }
      })
    }
  }
  
  // Finds index of the element in the cache
  findTheIndex(id) {
    return this.showAll().findIndex((element, index) => {
      return element.id === Number(id);
    })
  }
  
  // Returns the value of the first element in the cache that matches the title
  getUser(id) {
    return this._userList.find(element => {
      return element.id === Number(id);
    })
  }
  
  // If the title exists, find index, and change target item info
  editUser(id, data) {
    if (this.checkIfUserExists(id)) {
      let index = this.findTheIndex(id);
      if (this._itemDeletedArr.includes(this._userList[index].creationid)) {
        console.log(this._userList[index].creationid, 'creation id!');
        console.log(this._itemDeletedArr);
        return false
      } else { 
      let index = this.findTheIndex(id);
      let targetItem = this._userList[index];
      if (data.name) {
        if (data.name) targetItem.name = data.name;
        this.knex.raw(`UPDATE items SET name = '${data.name}' WHERE id = ${id};`)
          .then( EditCompleted => {
            return EditCompleted;
          })
          .catch( err => {
            console.log(err);
          })
      }
      if (data.price) {
        if (data.price) targetItem.price = data.price;
        this.knex.raw(`UPDATE items SET price = '${data.price}' WHERE id = ${id};`)
          .then( EditCompleted => {
            return EditCompleted;
          })
          .catch( err => {
            console.log(err);
          })
      }
      if (data.inventory) {
        if (data.inventory) targetItem.inventory = data.inventory;
        this.knex.raw(`UPDATE items SET inventory = '${data.inventory}' WHERE id = ${id};`)
          .then( EditCompleted => {
            return EditCompleted;
          })
          .catch( err => {
            console.log(err);
          })
      }
      // if (data.price) targetItem.price = data.price;
      // if (data.inventory) targetItem.inventory = data.inventory;
      
      return true;
     }
    } else {
      return false;
    }
  }
  
  // Splices the index out of the array and reindexes products
  removeUser(id) {
    if (this.checkIfUserExists(id)) {
      let index = this.findTheIndex(id);
      if (this._itemDeletedArr.includes(this._userList[index].creationid)) {
        return false
      } else { 
      this._itemDeletedArr.push(parseInt(this._userList[index].creationid));
      console.log(this._itemDeletedArr, "ITEM WAS DELETED");
      
      this.knex.raw('DELETE FROM items WHERE id = ' + id + ';' + 'ALTER SEQUENCE items_id_seq RESTART WITH 1;' + "UPDATE items SET id=nextval('items_id_seq');")
        .then( removed => {
          this._userList.splice(index, 1);
          this._userNumber--;
          return removed;
        })
        .catch( err => {
          console.log(err)
        })
        this.showAll();
        return true;
      }
    } else {
      return false;
    }
  
  }
  
  } 
  
  module.exports = Users;