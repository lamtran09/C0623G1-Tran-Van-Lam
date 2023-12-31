import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useNavigate,useParams} from "react-router-dom";
import * as contractService from "../../services/ContractService";
import {toast} from "react-toastify";
import { useState,useEffect } from "react";


function ContractUpdate() {
  const navigate = useNavigate();
  const [contract, setContract] = useState();
  const { id } = useParams();
  useEffect(() => {
    findById();
  }, []);
  const findById = async () => {
    let data = await contractService.findByIdContract(id);
    setContract(data);    
  };
  const updateContract = (values) => {
    let isSuccess = contractService.editContract(values, contract);
    if (isSuccess) {
      toast.success("Update successfully!!!!!");
      navigate("/list-contract");
    }
  };
  if (!contract) {
    return null;
  }
  const validateForm = {
    dateStart: Yup.string().required("Không được để trống trường này *"),
    dateEnd: Yup.string().required("Không được để trống trường này *"),
    pricePrevious: Yup.string().required("Không được để trống trường này *"),
    totalPrice: Yup.string().required("Không được để trống trường này *"),
  };
  return (
    <>
      <div class="container" style={{ marginTop: "6rem" }}>
        <h3 class="mt-3">Cập nhật hợp đồng</h3>
        <Formik initialValues={{...contract}}
        onSubmit={(value)=>{
            updateContract(value)
        }}
        validationSchema={Yup.object(validateForm)}>
          <Form>
            <div class="mb-3">
              <label for="name" class="form-label">
                Mã hợp đồng<span class="text-danger">(*)</span>
              </label>
              <Field type="text" name="codeContract" class="form-control" id="name" />
              <ErrorMessage
                name="codeContract"
                component="span"
                className="err-name"
              ></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="typeCustomer" class="form-label">
                Loại dịch vụ<span style={{ color: "red" }}>(*)</span>
              </label>
              <Field name="typeFacility" class="form-select" component="select" aria-label="Default select example">
                <option selected>Chọn loại dịch vụ</option>
                <option value="1">Villa</option>
                <option value="2">House</option>
                <option value="3">Room</option>
              </Field>
              <ErrorMessage
                name="typeFacility"
                component="span"
                className="err-name"
              ></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="dateStart" class="form-label">
                Ngày bắt đầu<span class="text-danger">(*)</span>
              </label>
              <Field type="date" name="dateStart" class="form-control" id="dateStart" />
              <ErrorMessage
                name="dateStart"
                component="span"
                className="err-name"
              ></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">
                Ngày kết thúc<span class="text-danger">(*)</span>
              </label>
              <Field type="date" name="dateEnd" class="form-control" id="date" />
              <ErrorMessage
                name="dateEnd"
                component="span"
                className="err-name"
              ></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="inputPricePrevious" class="form-label">
                Số tiền cọc trước<span class="text-danger">(*)</span>
              </label>
              <Field type="text" name="pricePrevious" class="form-control" id="inputPricePrevious" />
              <ErrorMessage
                name="pricePrevious"
                component="span"
                className="err-name"
              ></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="totalPrice" class="form-label">
                Tổng số tiền thanh toán<span class="text-danger">(*)</span>
              </label>
              <Field type="text" name="totalPrice" class="form-control" id="totalPrice" />
              <ErrorMessage
                name="totalPrice"
                component="span"
                className="err-name"
              ></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="inputAddress" class="form-label">
                Địa chỉ<span class="text-danger">(*)</span>
              </label>
              <Field type="text" name="address" class="form-control" id="inputAddress" />
              <ErrorMessage
                name="address"
                component="span"
                className="err-name"
              ></ErrorMessage>
            </div>
            <button type="submit" class="btn btn-primary">
              Xác nhận
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default ContractUpdate;
