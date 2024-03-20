import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import CreateWatch from "./CreateWatch"
import { store } from "../../store/store"


describe("CreateWatch component", () => {

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

})