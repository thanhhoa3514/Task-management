module.exports=(objectPagination,query,countTotalItems)=>{
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    if (query.limit) {
        objectPagination.limitItems = parseInt(query.limit);
    }
    
      // Check if page is not a number. If it's not, set it to 1 and skip to 0. This will prevent any errors.
      if(isNaN(objectPagination.currentPage)){
        objectPagination.currentPage = 1;
        objectPagination.skip = 0;
      }
    
      // Calculate the total number of pages skip
      objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    
      const totalPages=Math.ceil(countTotalItems / objectPagination.limitItems);
    
      objectPagination.totalPages = totalPages;

      return objectPagination;
}