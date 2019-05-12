import React, { Component } from 'react';
import Modals from './Modals';
class HomeContent extends Component {
    render() {
        return (
            <div>
              <div className="site-section-cover overlay img-bg-section" style={{backgroundImage: 'url("")'}}>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-12 col-lg-12">
        <form action="#" method="post">
          <div className="form-group row">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Địa chỉ điểm đến" />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="toggle-button align-items-center d-flex">

                <a href="#" className="btn btn-primary py-3 px-5" data-toggle="modal" data-target="#completeCharge">Đặt xe</a>
                <a href="#" className="site-menu-toggle p-5 js-menu-toggle text-black d-inline-block d-lg-none d-flex">
                  <span className="icon-menu h3 m-0" />
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<Modals/>


            </div>
        );
    }
}

export default HomeContent;