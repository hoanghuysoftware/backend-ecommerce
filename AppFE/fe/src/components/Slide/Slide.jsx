import React, { Component } from 'react';
import './Slide.css';

class Slide extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dataDynamic: this.props.data,
         data: ['/img/anhsideshow3.jpg', '/img/anhsideshow4.jpg', '/img/anhsideshow5.jpg'],
      };
   }

   render() {
      const data = this.state.dataDynamic == null ? this.state.data : this.state.dataDynamic;
      const { dataDynamic } = this.state;
      return (
         <div id="slide-img" className="carousel slide" data-ride="carousel">
            {dataDynamic !== null ? (
               <ol className="carousel-indicators product-list-img-dynamic">
                  {data.map((dataImg, index) => (
                     <li
                        key={index}
                        data-target="#slide-img"
                        data-slide-to={index}
                        className={index === 0 ? 'product-img-item active' : 'product-img-item'}
                     >
                        <div
                           className="img-item"
                           style={{ backgroundImage: `url(data:image/jpeg;base64,${dataImg})` }}
                        ></div>
                     </li>
                  ))}
               </ol>
            ) : (
               <ol className="carousel-indicators">
                  {data.map((dataImg, index) => (
                     <li
                        key={index}
                        data-target="#slide-img"
                        data-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                     ></li>
                  ))}
               </ol>
            )}
            <div className="carousel-inner">
               {dataDynamic !== null
                  ? data.map((dataImg, index) => (
                       <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <div className="img-class">
                             <div className="img-item" style={{ backgroundImage: `url(data:image/jpeg;base64,${dataImg})` }}></div>
                          </div>
                       </div>
                    ))
                  : data.map((dataImg, index) => (
                       <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <div className="img-class">
                             <div className="img-item" style={{ backgroundImage: `url(${dataImg})` }}></div>
                          </div>
                       </div>
                    ))}
            </div>
            <a className="carousel-control-prev" href="#slide-img" role="button" data-slide="prev">
               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
               <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#slide-img" role="button" data-slide="next">
               <span className="carousel-control-next-icon" aria-hidden="true"></span>
               <span className="sr-only">Next</span>
            </a>
         </div>
      );
   }
}

export default Slide;
