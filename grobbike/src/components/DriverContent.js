import React, { Component } from 'react';

class DriverContent extends Component {
    render() {
        return (
            <div className="site-section-cover overlay img-bg-section" style={{backgroundImage: 'url("")'}}>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-12 col-lg-12">
        <form action="#" method="post">
          <div className="form-group row">
            <div className="col-lg-6">
              <div className="toggle-button align-items-center d-flex">
                <a href="#" className="btn btn-primary py-3 px-5">Bắt đầu nhận cước từ khách</a>
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

  {/* Modal */}
 
<div className="modal fade" id="completeCharge" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-black" id="exampleModalLabel">Hoàn thành chuyến đi </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body p-5">
        <form action="#" method="post">
          <div className="col-md-6">
            <p>Số tiền: 
              <a href="#" />
            </p>
          </div>
          <div className="form-group row">
            <div className="col-md-6 ml-auto">
              <input type="submit" className="btn btn-block btn-primary text-white py-3 px-5" defaultValue="Xác nhận" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</div>

        );
    }
}

export default DriverContent;