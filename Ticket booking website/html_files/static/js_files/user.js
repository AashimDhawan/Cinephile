async function getMovie()
{

    var text=document.getElementById("sm").value;
    const url="localhost:3000/movies/"+text;
    const response=await fetch(url)
    const data=await response.json();
    console.log(data);

}