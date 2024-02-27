import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import { MemoryRouter } from "react-router-dom"
import { Header } from "./Header"


describe("Header component", () => {

    test("guest user should see following routes: Watches,Search,Login,Register", async () => {

        const propsMock = {
            isAuthenticated: false,
            isOwner: false
        }
        
            render(
                <Provider store={store}>
                    <MemoryRouter>
                    <Header {...propsMock} />
                    </MemoryRouter>
                </Provider>
            )
        
            const watchesLink = screen.getByRole('link',{name:'Watches'})
            const searchLink = screen.getByRole('link',{name: 'Search'})
            const loginLink = screen.getByRole('link',{name: 'Login'})
            const registerLink = screen.getByRole('link',{name: 'Register'})
            const logoutButton = screen.queryByRole('button',{name: 'Logout'})
        
            expect(watchesLink).toBeInTheDocument()
            expect(searchLink).toBeInTheDocument()
            expect(loginLink).toBeInTheDocument()
            expect(registerLink).toBeInTheDocument()
            expect(logoutButton).not.toBeInTheDocument()
        })

test("logged in user should see following routes: Watches,Search,Cart,Purchase History,Logout", async () => {

const propsMock = {
    isAuthenticated: true,
    isOwner: false
}

    render(
        <Provider store={store}>
            <MemoryRouter>
            <Header {...propsMock} />
            </MemoryRouter>
        </Provider>
    )

    const watchesLink = screen.getByRole('link',{name:'Watches'})
    const searchLink = screen.getByRole('link',{name: 'Search'})
    const cartLink = screen.getByRole('link',{name: 'Cart'})
    const purchaseHistoryLink = screen.getByRole('link',{name: 'Purchase History'})
    const logoutButton = screen.getByRole('button',{name: 'Logout'})

    expect(watchesLink).toBeInTheDocument()
    expect(searchLink).toBeInTheDocument()
    expect(cartLink).toBeInTheDocument()
    expect(purchaseHistoryLink).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
})

test("admin user should see following routes: Watches,Search,Create Product,All Purchases,Logout", async () => {

    const propsMock = {
        isAuthenticated: true,
        isOwner: true
    }
    
        render(
            <Provider store={store}>
                <MemoryRouter>
                <Header {...propsMock} />
                </MemoryRouter>
            </Provider>
        )
    
        const watchesLink = screen.getByRole('link',{name:'Watches'})
        const searchLink = screen.getByRole('link',{name: 'Search'})
        const createProductLink = screen.getByRole('link',{name: 'Create Product'})
        const allPurchasesLink = screen.getByRole('link',{name: 'All Purchases'})
        const logoutButton = screen.getByRole('button',{name: 'Logout'})
    
        expect(watchesLink).toBeInTheDocument()
        expect(searchLink).toBeInTheDocument()
        expect(createProductLink).toBeInTheDocument()
        expect(allPurchasesLink).toBeInTheDocument()
        expect(logoutButton).toBeInTheDocument()
    })

})