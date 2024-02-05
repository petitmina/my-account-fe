import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../action/userActions";
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmedPassword: '',
    })

    const [passwordError, setPasswordError] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        const {email, name, password, confirmedPassword} = formData;

        if(password !== confirmedPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다');
            return;
        }
        setPasswordError('');
        setPasswordError(false);
        dispatch(userActions.registerUser({email, password, name}, navigate))
    };

    const onChange = (event) => {
        event.preventDefault();

        const {id, value} = event.target;
        setFormData({ ...formData, [id]:value });
    };

  return (
    <div className="register__container">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>이름</Form.Label>
          <Form.Control type="name" id="name" placeholder="이름을 입력하세요" required onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" id="password" placeholder="Password" required onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            id="confirmedPassword"
            placeholder="Password"
            required
            onChange={onChange}
          />
        </Form.Group>
        <Form.Control.Feedback type="invalid">
            {passwordError}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            회원가입하기
          </Button>
          <div className="mt-2 ">
            이미 회원이신가요?
            <Link to="/login" className="text-decoration-none">
              로그인 하기
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
