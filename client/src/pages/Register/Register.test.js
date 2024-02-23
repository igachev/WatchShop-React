import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import { MemoryRouter } from "react-router-dom"
import Register from './Register'
import * as authService from "../../services/authService"
import * as authActions from "../../store/actions/authActions"
import { failedRegisterAction } from "../../store/actions/authActions"
import { act } from "react-dom/test-utils"
import AuthForm from "../../components/AuthForm/AuthForm"

describe("Register Component", () => {

    beforeEach(() => {
        // Clear any setup or reset conditions here
        jest.clearAllMocks(); // This can be used to clear all mocks if needed
      });

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

test("should display error message if password and repeat password are mismatching", async () => {
    let message = "passwords missmatch!"
    let registerActionSpy;
    let registerSpy;
    
        await act(async() => {
           registerActionSpy = jest.spyOn(authActions,'registerAction')
          registerSpy = jest.spyOn(authService, 'register').mockRejectedValue({ response: { data: { message: 'passwords mismatch!' } } });
           store.dispatch(failedRegisterAction(message))
    
            render(
                <Provider store={store}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
                </Provider>
            )

            

        })
    
        await act(async() => {
            const emailInput = await screen.findByTestId('email')
            const passwordInput = await screen.findByTestId('password')
            const repeatPasswordInput = await screen.findByTestId('repeat-password')
        
            fireEvent.change(emailInput,{target: {value:'stoqn@abv.bg'}})
            fireEvent.change(passwordInput,{target: {value: '1234'}})
            fireEvent.change(repeatPasswordInput,{target: {value: '12'}})
    
        const registerButton = screen.getByRole('button',{name:'Register'})
        fireEvent.click(registerButton)

        const passwordMissmatchText = screen.queryByText("passwords missmatch!")
        expect(passwordMissmatchText).toBeInTheDocument()
        
        })
    
        expect(registerActionSpy).toHaveBeenCalledTimes(1)
        expect(registerSpy).toHaveBeenCalledTimes(1)
        expect(registerSpy).toHaveBeenCalledWith('stoqn@abv.bg','1234','12')
       
        // Cleanup spies
    
        registerSpy.mockRestore();
    registerActionSpy.mockRestore();
    
    })

test("should display validation errors if click 'Register' button with empty input fields", async () => {

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Register />
        </MemoryRouter>
        </Provider>
    )

    const registerButton = screen.getByRole('button',{name:'Register'})
    fireEvent.click(registerButton)

    const emailValidationText = screen.queryByText(/email is required/i)
    const passwordValidationText = screen.queryByText("Password is required")
    const repeatPasswordValidationText = screen.queryByText("Repeat Password is required")

    expect(emailValidationText).toBeInTheDocument()
    expect(passwordValidationText).toBeInTheDocument()
    expect(repeatPasswordValidationText).toBeInTheDocument()
})




test("should call authService.register() and authActions.registerAction() on successful registration", async () => {
    let registerSpy;
    let registerActionSpy;

    await act(async () => {
        registerSpy = jest.spyOn(authService,'register')
        registerActionSpy = jest.spyOn(authActions,'registerAction')
      

    render(
        <Provider store={store}>
        <MemoryRouter>
            <Register />
        </MemoryRouter>
        </Provider>
    )
    })

    await act(async() => {
        const emailInput = await screen.findByTestId('email')
    const passwordInput = await screen.findByTestId('password')
    const repeatPasswordInput = await screen.findByTestId('repeat-password')

    fireEvent.change(emailInput,{target: {value:'stoqn@abv.bg'}})
    fireEvent.change(passwordInput,{target: {value: '1234'}})
    fireEvent.change(repeatPasswordInput,{target: {value: '1234'}})

    
    })

    const registerButton = screen.getByRole('button',{name:'Register'})
    fireEvent.click(registerButton)

    expect(registerSpy).toHaveBeenCalledTimes(1)
    expect(registerSpy).toHaveBeenCalledWith('stoqn@abv.bg','1234','1234')
    expect(registerActionSpy).toHaveBeenCalledTimes(1)
    // Cleanup spies
    
    registerSpy.mockRestore();
    registerActionSpy.mockRestore();
    
})


})