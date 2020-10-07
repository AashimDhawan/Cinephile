async function delete_movie(){
    var deleteMovie=document.getElementById("del_movie").value;

        var xhr = new XMLHttpRequest();   // new HttpRequest instance 
        xhr.open('DELETE', 'http://localhost:3000/movies/'+deleteMovie, true);
		xhr.onreadystatechange = function() {
            if(this.readyState!=4)
            return;
            if(this.status==200)
            {
                console.log(deleteMovie+" deleted");
                alert(deleteMovie+" deleted");

            }

        }
        xhr.send();

}


 function add_movie()
{
    var addMovie_name=document.getElementById("add_movie_name").value;
    var addMovie_genre=document.getElementById("add_movie_genre").value;
    var xhr=new XMLHttpRequest(); 
    xhr.open("POST", "http://localhost:3000/movies/",true);
    xhr.onreadystatechange=function(){
        if(this.readyState!=4)
            return;

            if (this.readyState == 4 && this.status == 201) {
                var data= JSON.parse(this.responseText);
                console.log(data);
                alert(data.message);
            }
        
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({name: addMovie_name, genre: addMovie_genre}));
}

var data;
            async function getMovie()
            {

                 var text=document.getElementById("sm").value;

                var xhr = new XMLHttpRequest();
                // we defined the xhr
                xhr.open('GET', 'http://localhost:3000/movies/'+text, true);

                xhr.onreadystatechange = function () {
                if (this.readyState != 4) return;

                if (this.status == 200) {

                 data = JSON.parse(this.responseText);
				 console.log(data.length);
				 if(data.length>0)
				 {
					 /*var string_data_name=JSON.stringify(data[0].name );
                 var string_data_genre=JSON.stringify(data[0].genre);*/

                var text_node =document.createTextNode("Name : "+data[0].name+" Genre : "+data[0].genre+" ");
                var x= document.getElementById('res_data');
                x.appendChild(text_node);
                console.log(data[0].name);

                // we get the returned data
				 }
				 else{
					  var text_node =document.createTextNode("No such entry exists");
					 var x= document.getElementById('res_data');
						x.appendChild(text_node);
				 }
				 
				 
                 
                } 
					/*
					var x= document.getElementById('res_data');
                    x.appendChild("No such movie found"); */
					
               

            // end of state change: it can be after some time (async)
        };

        xhr.open('GET', 'http://localhost:3000/movies/'+text, true);
        xhr.send();
}