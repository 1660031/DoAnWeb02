import React, { Component } from 'react';

class Modals extends Component {
    render() {
        return (
            <div>
                <div className="modal fade" id="completeCharge" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-black" id="exampleModalLabel">Thông tin tài xế</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body p-5">
        <div className="form-group row">
          <div className="col-md-6 mb-4 mb-lg-0">
            <p>Họ tên:</p>
            <p />
          </div>
          <div className="col-md-6">
            <p>Số điện thoại: </p>
            <p />
          </div>
          <div className="col-md-6">
            <p>Hiệu xe: </p>
            <p />
          </div>
          <div className="col-md-6">
            <p>Biển số: </p>
            <p />
          </div>
          <div className="col-md-6">
            {/*Hiển thị map */}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6 ml-auto">
            <input type="submit" className="btn btn-block btn-primary text-white py-3 px-5" defaultValue="Xác nhận" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="bookingReceive" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-black" id="exampleModalLabel">Thông tin khách hàng</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body p-5">
        <div className="form-group row">
          <div className="col-md-6">
            <p>Số điện thoại: </p>
            <p />
          </div>
          <div className="col-md-6">
            {/*Hiển thị map*/}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6 ml-auto">
            <input type="submit" className="btn btn-block btn-primary text-white py-3 px-5" defaultValue="Nhận cước" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
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


<div className="modal fade" id="signUp" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body p-5">
        <div className="container">
          <div className="col-md-8 mx-auto">
            <h1 className="text-center mb-5">ĐĂNG KÝ</h1>
            <form method="POST">
              <div className="form-group row">
                <div className="col-md-12">
                  <input className="form-control border" type="text" name="username" placeholder="Số điện thoại" /> 
                </div>
              </div> 
              <div className="form-group row">
                <div className="col-md-12">
                  <input className="form-control border" type="text" name="fullname" placeholder="Tên đầy đủ" /> 
                </div>
              </div>   
              <div className="form-group row">
                <div className="col-md-4 mb-4 mb-lg-0">
                  <label className="text-black">&nbsp;&nbsp;&nbsp;Giới tính</label>
                </div>
                <div className="col-md-4">
                  <label><input  type="radio" name="radioSex" />&nbsp;&nbsp;&nbsp;Nam</label>
                </div>
                <div className="col-md-4">              
                  <label><input  type="radio" name="radioSex" />&nbsp;&nbsp;&nbsp;Nữ</label>
                </div>
              </div>              
              <div className="form-group row">
                <div className="col-md-12">
                  <input className="form-control border" type="password" name="password" placeholder="Mật khẩu" /> 
                </div>
              </div>                 
              <div className="form-group row">
                <div className="col-md-12">
                  <input className="form-control border" type="password" name="repeatpw" placeholder="Xác nhận mật khẩu" />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                <select id="company" class="form-control border">
                  <option value="" disabled selected>Chọn loại xe</option>
                  <option>Wave</option>
                  <option>Sirius</option>
                  <option>SH</option>
                  <option>Dream</option>
                  <option>Exciter</option>
                  <option>Jupiter</option>
                  <option>Vision</option>
                </select> 
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <input className="form-control border" type="text" name="BSxe" placeholder="Biển số xe" />
                </div>
              </div>
              <input className="btn btn-block btn-primary text-white py-3 px-5" type="submit" name="submit" defaultValue="ĐĂNG KÝ" />
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="signIn" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body p-5">
        <div className="container">
          <div className="col-md-8 mx-auto">
            <h1 className="text-center mt-5 mb-5">ĐĂNG NHẬP</h1>
            <form method="POST">
              <div className="form-group row">
                <div className="col-md-12">
                  <input className="form-control border" type="text" name="username" placeholder="Số điện thoại" /> 
                </div>
              </div>  
                                                       
              <div className="form-group row">
                <div className="col-md-12">
                  <input className="form-control border" type="password" name="password" placeholder="Mật khẩu" /> 
                </div>
              </div>                 
              <input className="btn btn-block btn-primary text-white py-3 px-5" type="submit" name="submit" defaultValue="ĐĂNG NHẬP" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
            </div>
        );
    }
}

export default Modals;