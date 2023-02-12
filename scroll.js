const imageContainer=document.querySelector('#image-container');
const loader=document.querySelector('#loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];


//nwe image loading everytime
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        console.log('ready', ready);
    }
}

// create elements for links

function displayPhotos(){


    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log('totalImages',totalImages);


    photosArray.forEach((photo)=>{
        const item=document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target','_blank');

        const img=document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);


        img.addEventListener('load',imageLoaded);
        
         
    })
}


// unsplash api
const count=30;
const apiKey='zpG1R4M3-Mr27Kph1gJtLDbzYB_7WArZRVfb56B1nvc';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//get photos from api

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
        
       
        
    } catch (error) {
        
    }
}


//scrolling at the end and accessing images using api
window.addEventListener('scroll',()=>{
   if(window.innerHeight + window.scrollY>= document.body.offsetHeight-1000 && ready){
    ready=false;
    getPhotos();
    console.log('load more');
   }
})


getPhotos();


