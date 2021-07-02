// a collection of IO helper functions

const fs = require('fs');
const { BASE_PATH = './uploads' } = process.env;


async function listFiles(userID, directory){
  //returns userID's files in directory
  const path = `./uploads/${userID}/${directory}`;
  try{
    await fs.promises.access(path);
    let files = [];
    let directories = [];
    fs.readdir(path, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    });
  }
  catch(e){
    console.log(e);
  }
}


async function hasFile(path){
  // returns true if this path is valid
  path = `${BASE_PATH}/${path}`;
  try{
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  }
  catch{
    return false;
  }
}


async function createDir(path){
  // create a new folder for this user at path
  // returns true on success
  if(!await hasFile(path)){
    return fs.mkdir(`${BASE_PATH}/${path}`, (err) => {
      return !err;
    });
  }
  return false;
}


async function createFile(path){

}


function getFilePath(path){
  // returns formatted file path
  return `${BASE_PATH}/${path}`;
}


const IO = { 
  listFiles, 
  hasFile,
  getFilePath, 
  createDir, 
  createFile 
};

module.exports = IO;
