module.exports = (query)=>{
    let objectSearch={
        keyword: "",
    };

    if(query.keyword){
        objectSearch.keyword=query.keyword;
        
        // Append keyword to query
        const regex=new RegExp(objectSearch.keyword,"i");// i is no special character is lower or upper case
        objectSearch.regex=regex;
    }
    return objectSearch;
}