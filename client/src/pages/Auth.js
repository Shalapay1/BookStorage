import React, {useContext, useState} from 'react';
import { Button, Card, Container, Form, FormControl, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/const';
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

import {useNavigate} from 'react-router-dom';

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
      try {
          let data;
          if (isLogin) {
              data = await login(email, password);
          } else {
              data = await registration(email, password);
          }
          user.setUser(user)
          user.setIsAuth(true)
          navigate(SHOP_ROUTE)
      } catch (e) {
          alert(e.response.data.message)
      }

  }

  return (
    <Container className="d-flex justify-content-center align-items-center"
    style={{height: window.innerHeight - 54}}>
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизація' : 'Регістрація'}</h2>
        <Form className="d-flex flex-column">
            <FormControl
              className="mt-2"
              placeholder="Введіть e-mail"
              value={email}
                        onChange={e => setEmail(e.target.value)}
            />
            <FormControl
              className="mt-2"
              placeholder="Введіть пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <Row className="d-flex justify-content-between mt-2 pl-2 pr-2">
              {isLogin ?
                <div>
                  Нема аккаунту? <NavLink to={REGISTRATION_ROUTE}>Зарегейструйся!</NavLink>
                </div>
                :
                <div>
                  Є аккаунту? <NavLink to={LOGIN_ROUTE}>Зайдіть!</NavLink>
                </div>
              }
              <Button 
                variant={"outline-success"}
                onClick={click}
                className="align-self-end">
                {isLogin ? 'Зайти' : 'Регістрація'}
              </Button>
            </Row>

            
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
