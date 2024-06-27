export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const hasReferencedPath = async(model,id) => {
  let filter = {};
  // Get the schema paths
  const schemaPaths = model.schema.paths;

  // Iterate over the schema paths to find references
  Object.keys(schemaPaths).forEach((path) => {
    if (schemaPaths[path].options && schemaPaths[path].options.ref) {
      const refPathName = path;
      //console.log(refPathName)
      
        filter[refPathName] = id;
    }
  });
  //console.log("FILTER FORMED IS :",filter)
  return filter;
};
