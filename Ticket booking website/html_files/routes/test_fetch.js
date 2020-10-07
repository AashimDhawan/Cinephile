function fetch_test()
{
    console.log("fetched image");
    fetch('one-piece.jpg').then(response=>{
        console.log(response);
        return response.blob();
    });
    .then(blob=>{
        console.log(blob);
        document.getElementById('op').src=URL.createObjectURL(blob);
    });


}