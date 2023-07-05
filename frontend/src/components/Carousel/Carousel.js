import React from "react";
import './Carousel.css'
const Carousel=()=>{
    return(<>
{/* <div id="myCarousel" class="carousel slide" data-ride="carousel" style={{width:"95%"}}>
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>

  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://via.placeholder.com/1200x600/FFB6C1/000000" alt="Rent your clothes"/>
      <div class="carousel-caption">
        <h3>Rent your clothes</h3>
        <p>List your clothes for rent and earn money.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://via.placeholder.com/1200x600/87CEFA/000000" alt="Rent clothes from others"/>
      <div class="carousel-caption">
        <h3>Rent clothes from others</h3>
        <p>Browse and rent clothes from others.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://via.placeholder.com/1200x600/90EE90/000000" alt="Affordable rental rates"/>
      <div class="carousel-caption">
        <h3>Affordable rental rates</h3>
        <p>Get trendy clothes at affordable rental rates.</p>
      </div>
    </div>
  </div>

  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
</div> */}
{/* <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel" style={{width:"100%",height:"700px"}}>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://img.mensxp.com/media/content/2016/Jun/clothing-rental-websites-that-can-spruce-up-your-wardrobe-800x420-1466584736.jpg" class="d-block w-100" alt="..."/>
      <div class="carousel-caption">
        <h3>Rent your clothes</h3>
        <p>List your clothes for rent and earn money.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
      <div class="carousel-caption">
        <h3>Rent clothes from others</h3>
        <p>Browse and rent clothes from others.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://im.whatshot.in/img/2018/Jun/fly-cropped-1528197050.jpg" class="d-block w-100" alt="..."/>
      <div class="carousel-caption">
        <h3>Affordable rental rates</h3>
        <p>Get trendy clothes at affordable rental rates.</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> */}
<div id="carouselBasicExample" class="carousel slide carousel-fade" data-mdb-ride="carousel">
  <div class="carousel-indicators">
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="0"
      class="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>

  <div class="carousel-inner">
    <div class="carousel-item active">
     
      <img src="https://img.businessoffashion.com/resizer/4q_Osz8pXvhOs8NA2lnXEfXeMYk=/1600x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/businessoffashion/IOIBK5MDK5AV7KDTJB2VHLAI5A.jpg" class="d-block w-100" alt="Sunset Over the City" style={{height:"500px",filter: "opacity(40%)"}} />
    
    
      <div class="carousel-caption">
        <div style={{display:"flex" ,flexDirection:"column",marginRight:"-90%",marginBottom:"15%"}}>
        <p className="ribbon mb-3">PUT CLOTHS FOR RENT</p>
        <p className="ribbon mt-3">BUY CLOTHS FOR RENT</p>
        </div>
        <div>
        <h1 className="text-white display-4">Rent your clothes</h1>
        <h3 className="" style={{fontWeight:"revert-layer",color:"pink"}}>List your clothes for rent and earn money.</h3>
       <a href="#products"><button type="btn btn-primary">Start</button></a>
        </div>
        </div>
    </div>

    {/* <div class="carousel-item">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp" class="d-block w-100" alt="Canyon at Nigh"style={{height:"500px"}}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>

    <div class="carousel-item">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp" class="d-block w-100" alt="Cliff Above a Stormy Sea" style={{height:"500px"}}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </div> */}
  </div>

  <button class="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </>)
}
export default Carousel;