import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import { MemoryRouter } from "react-router-dom"
import Register from './Register'


describe("Register Component", () => {

test("should have only 1 button with name 'Register'", async () => {

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Register />
        </MemoryRouter>
        </Provider>
    )

    const registerButton = screen.getByRole('button',{name:'Register'})
    expect(registerButton).toBeInTheDocument()
})

test("should have only 3 input fields", async () => {

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Register />
        </MemoryRouter>
        </Provider>
    )

    const emailInput = await screen.findByTestId('email')
    const passwordInput = await screen.findByTestId('password')
    const repeatPasswordInput = await screen.findByTestId('repeat-password')
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(repeatPasswordInput).toBeInTheDocument()
})

test("should have the following texts: 'Email:', 'Password:', 'Repeat Password'",async () => {

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Register />
        </MemoryRouter>
        </Provider>
    )

    const emailLabelText = screen.getByText(/email:/i)
    const passwordLabelText = screen.getByText(/password:/i)
    const repeatPasswordLabelText = screen.getByText(/repeat password/i)

    expect(emailLabelText).toBeInTheDocument()
    expect(passwordLabelText).toBeInTheDocument()
    expect(repeatPasswordLabelText).toBeInTheDocument()
})

})