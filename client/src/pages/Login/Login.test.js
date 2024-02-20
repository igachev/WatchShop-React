import { act, fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import { MemoryRouter } from "react-router-dom"
import Login from './Login'
import * as authService from '../../services/authService'
import * as authActions from '../../store/actions/authActions'
import { confirmedLoginAction,failedLoginAction } from "../../store/actions/authActions"

describe("Login Component", () => {

test("should see only 1 button with name 'Login'", async () => {

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        </Provider>
    )

    const loginBtn = await screen.findByRole('button',{name:/login/i})
    const allButtons = await screen.findAllByRole('button')
    expect(loginBtn).toBeInTheDocument()
    expect(allButtons.length).toBe(1)
})

test("should have email and password input fields", async () => {
    
    render(
        <Provider store={store}>
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        </Provider>
    )

    const emailInput = await screen.findByTestId('email')
    const passwordInput = await screen.findByTestId('password')
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
})

test("should have texts 'Email:' and 'Password:'", async () => {

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        </Provider>
    )

    const emailText = await screen.findByText('Email:')
    const passwordText = await screen.findByText('Password:')
    expect(emailText).toBeInTheDocument()
    expect(passwordText).toBeInTheDocument()
})

test("should display validation errors if click 'Login' button with empty input fields",async () => {

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        </Provider>
    )

    const loginBtn = await screen.findByRole('button',{name:/login/i})
    fireEvent.click(loginBtn)
    const emailValidationText = screen.queryByText(/email is required/i)
    const passwordValidationText = screen.queryByText(/password is required/i)
    expect(emailValidationText).toBeInTheDocument()
    expect(passwordValidationText).toBeInTheDocument()
})

test("after successful login the redux store auth should be updated with:_id,email,accessToken,isOwner", async () => {

    await act(async() => {
      
        store.dispatch(confirmedLoginAction({_id:"1234",email:"ivan111@abv.bg",accessToken:'token',isOwner:'false'}))
        
      render(
          <Provider store={store}>
          <MemoryRouter>
              <Login />
          </MemoryRouter>
          </Provider>
      )
      })

      const authState = store.getState().auth.auth
      expect(authState).toEqual({_id:"1234",email:"ivan111@abv.bg",accessToken:'token',isOwner:'false'})
})

test("failed login should display error message",async () => {
    
    await act(async() => {
      
       await store.dispatch(failedLoginAction('Invalid email or password'))
       
      render(
          <Provider store={store}>
          <MemoryRouter>
              <Login />
          </MemoryRouter>
          </Provider>
      )
      })

      const errorMessage = screen.queryByText(/invalid email or password/i);
      expect(errorMessage).toBeInTheDocument();
})

test("should call authService.login() and authActions.loginAction() when submit login form", async() => {

    let loginActionSpy;
    let loginSpy;
    
    await act(async() => {
      
      //  store.dispatch(confirmedLoginAction({_id:"1234",email:"ivan111@abv.bg",accessToken:'token',isOwner:'false'}))
      loginActionSpy = jest.spyOn(authActions,'loginAction')
     // confirmedLoginActionSpy = jest.spyOn(authActions,'confirmedLoginAction')
      loginSpy = jest.spyOn(authService,'login')

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        </Provider>
    )
    })

    await act(async() => {
    let emailInput = await screen.findByTestId('email')
    let passwordInput = await screen.findByTestId('password')
    fireEvent.change(emailInput,{ target: {value: "ivan111@abv.bg" } } )
    fireEvent.change(passwordInput,{ target: {value: "1234" } } )
    })

    fireEvent.submit(screen.getByTestId('auth-form-submit'))
    expect(loginActionSpy).toHaveBeenCalledTimes(1)
    expect(loginSpy).toHaveBeenCalledTimes(1)
    expect(loginSpy).toHaveBeenCalledWith("ivan111@abv.bg","1234")
    expect(window.location.pathname).toBe('/')
})



})