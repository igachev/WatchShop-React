import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import { MemoryRouter } from "react-router-dom"
import Login from './Login'

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

})