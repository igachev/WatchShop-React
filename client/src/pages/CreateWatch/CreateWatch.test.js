import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import CreateWatch from "./CreateWatch"
import { store } from "../../store/store"
//import { createWatchAction } from "../../store/actions/watchActions"
import * as watchActions from "../../store/actions/watchActions"
import * as watchService from "../../services/watchService"


describe("CreateWatch component", () => {

    beforeEach(() => {
        jest.clearAllMocks()
        
    })
    
    afterEach(() => {
        // restore the spy created with spyOn
       // jest.restoreAllMocks();
        jest.clearAllMocks()
      });

test("should have title 'Add New Product'", async() => {

    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreateWatch />
            </MemoryRouter>
        </Provider>
    )

        const h1Element = screen.getByRole('heading',{level:1,name:'Add New Product'})
        expect(h1Element).toBeInTheDocument()
})

test("should have 'Create' button and no other buttons", async() => {

    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreateWatch />
            </MemoryRouter>
        </Provider>
    )

    const createButton = screen.getByRole('button',{name:'Create'})
    const allButtons = screen.getAllByRole('button')
    expect(createButton).toBeInTheDocument()
    expect(allButtons.length).toBe(1)
})

test("should have 7 text input fields, 1 number input field, 1 select menu", async() => {

    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreateWatch />
            </MemoryRouter>
        </Provider>
    )

    const allTextInputFields = screen.getAllByRole('textbox')
    const allSelectMenus = screen.getAllByRole('combobox')
    const allNumberInputFields = screen.getAllByRole('spinbutton')
    
    expect(allTextInputFields.length).toBe(7)
    expect(allSelectMenus.length).toBe(1)
    expect(allNumberInputFields.length).toBe(1)
})

test("should display form validation errors if we click 'Create' button with empty fields",async() => {

    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreateWatch />
            </MemoryRouter>
        </Provider>
    )

    const createButton = screen.getByRole('button',{name:'Create'})
    fireEvent.click(createButton)

    const brandIsRequired = await screen.findByText(/brand is required/i)
    const modelIsRequired = await screen.findByText(/model is required/i)
    const imageIsRequired = await screen.findByText(/image is required/i)
    const batteryIsRequired = await screen.findByText(/battery is required/i)
    const mechanismIsRequired = await screen.findByText(/mechanism is required/i)
    const priceIsRequired = await screen.findByText(/price is required/i)
    const strapIsRequired = await screen.findByText(/strap is required/i)
    const glassIsRequired = await screen.findByText(/glass is required/i)
    const waterResistanceIsRequired = await screen.findByText(/water resistance is required/i)

    expect(brandIsRequired).toBeInTheDocument()
    expect(modelIsRequired).toBeInTheDocument()
    expect(imageIsRequired).toBeInTheDocument()
    expect(batteryIsRequired).toBeInTheDocument()
    expect(mechanismIsRequired).toBeInTheDocument()
    expect(priceIsRequired).toBeInTheDocument()
    expect(strapIsRequired).toBeInTheDocument()
    expect(glassIsRequired).toBeInTheDocument()
    expect(waterResistanceIsRequired).toBeInTheDocument()
})

test("should call createWatchAction() when 'Create' button is clicked and all input fields are filled", async() => {

    let createWatchActionSpy = jest.spyOn(watchActions,'createWatchAction');
    let createWatchSpy = jest.spyOn(watchService,'createWatch');

    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreateWatch />
            </MemoryRouter>
        </Provider>
    )

    const createButton = screen.getByRole('button',{name:'Create'})
    let brandInput = await screen.findByTestId('brand-input')
    let modelInput = await screen.findByTestId('model-input')
    let imageInput = await screen.findByTestId('image-input')
    let batteryInput = await screen.findByTestId('battery-input')
    let mechanismInput = await screen.findByTestId('mechanism-input')
    let priceInput = await screen.findByTestId('price-input')
    let strapInput = await screen.findByTestId('strap-input')
    let glassInput = await screen.findByTestId('glass-input')
    let waterResistanceInput = await screen.findByTestId('water-resistance-input')

    fireEvent.change(brandInput,{ target: { value: 'casio' } })
    fireEvent.change(modelInput,{ target: { value: 'test' } })
    fireEvent.change(imageInput,{ target: { value: 'https://93283928392' } })
    fireEvent.change(batteryInput,{ target: { value: 'Lithium' } })
    fireEvent.change(mechanismInput,{ target: { value: 'mechanical' } })
    fireEvent.change(priceInput,{ target: { value: 100 } })
    fireEvent.change(strapInput,{ target: { value: 'leather' } })
    fireEvent.change(glassInput,{ target: { value: 'mineral' } })
    fireEvent.change(waterResistanceInput,{ target: { value: '10 ATM' } })

    fireEvent.click(createButton)
    expect(createWatchActionSpy).toHaveBeenCalledTimes(1)
    expect(createWatchSpy).toHaveBeenCalledTimes(1)
    expect(createWatchSpy).toHaveBeenCalledWith(brandInput.value,modelInput.value,imageInput.value,batteryInput.value,mechanismInput.value,priceInput.value,strapInput.value,glassInput.value,waterResistanceInput.value)

    createWatchActionSpy.mockRestore()
    createWatchSpy.mockRestore()
})

})