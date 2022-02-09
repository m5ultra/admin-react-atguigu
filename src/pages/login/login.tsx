import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// @ts-ignore
import { handleLogin } from '../../api'
import { useNavigate } from 'react-router-dom'

/**
 用户名/密码的合法性要求
 * 1.必须输入
 * 2.必须大于4位
 * 3.必须小于12位
 * 4.必须是英文、数字或下划线组成
 * 5.验证密码一致性
 */
const Login = () => {
  let navigate = useNavigate()
  const onFinish = async (values: { username: string; password: string }) => {
    const { username, password } = values
    const result = await handleLogin(username, password)
    if (+result.status === 0) {
      navigate('/admin', { replace: true })
    }
  }
  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                validator(_, username) {
                  if (!username) return Promise.reject(new Error('用户名不能为空'))
                  const reg = /^[A-Za-z0-9_]{4,12}$/
                  if (reg.test(username)) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('用户名必须是4-12位的字母、数字或下划线组合'))
                  }
                },
              },
            ]}
            initialValue={'admin'}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                validator(_, password) {
                  if (!password) return Promise.reject(new Error('密码名不能为空'))
                  const reg = /^[A-Za-z0-9_@]{4,12}$/
                  if (reg.test(password)) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('密码必须是4-12位的字母、数字或下划线组合'))
                  }
                },
              },
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>

          {/*<Form.Item*/}
          {/*  name="confirm_password"*/}
          {/*  rules={[*/}
          {/*    ({ getFieldValue }) => ({*/}
          {/*      validator(_, confirm_password) {*/}
          {/*        if (!confirm_password) {*/}
          {/*          return Promise.reject(new Error('确认密码不能为空'))*/}
          {/*        }*/}
          {/*        if (!confirm_password || getFieldValue('password') === confirm_password) {*/}
          {/*          return Promise.resolve()*/}
          {/*        }*/}
          {/*        return Promise.reject(new Error('两次数码密码不一致'))*/}
          {/*      },*/}
          {/*    }),*/}
          {/*  ]}*/}
          {/*>*/}
          {/*  <Input*/}
          {/*    prefix={<LockOutlined className="site-form-item-icon" />}*/}
          {/*    type="password"*/}
          {/*    placeholder="Confirm Password"*/}
          {/*  />*/}
          {/*</Form.Item>*/}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}

export default Login
