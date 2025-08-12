const multipleMongoToObject = (mongooses) => {
  return mongooses.map((mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
  });
};

const mongooseToObject = (mongoose) => {
  return mongoose ? mongoose.toObject() : mongoose;
};

export {multipleMongoToObject, mongooseToObject}
