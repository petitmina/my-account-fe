import React, { useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../action/userActions";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const {email, password} = formData;
    dispatch(userActions.loginWithEmail({email, password}));
  }

  const onChange = (event) => {
    event.preventDefault();

    const { id, value } = event.target;
    setFormData({...formData, [id]: value });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login__container ">
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일을 입력하세요" id="email" onChange={onChange} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" onChange={onChange} required/>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            로그인 하기
          </Button>
          <div className="mt-2 ">
            회원이 아니신가요?
            <Link to="/register" className="text-decoration-none">
              회원가입 하기
            </Link>
          </div>
        </div>
      </Form> 
    </div>
   
  )
}

export default LoginPage
