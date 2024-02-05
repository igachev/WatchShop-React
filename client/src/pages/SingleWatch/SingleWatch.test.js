
import { act } from 'react-dom/test-utils'
import * as watchService from '../../services/watchService'
import { store } from '../../store/store'
import { getSingleWatchAction, getWatchRatingAction } from '../../store/actions/watchActions'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import SingleWatch from './SingleWatch'
import { confirmedLoginAction } from '../../store/actions/authActions'


jest.mock('../../services/watchService', () => ({
    getWatch: jest.fn(),
    getRate: jest.fn()
}))

describe("SingleWatch component", () => {

const mockWatch = {
        "_id": "64ce44580bc299cc98f4a95c",
        "brand": "Casio",
        "model": "G-Shock",
        "image": "https://images.unsplash.com/photo-1595520407624-66b24f015830?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "battery": "Lithium 3v",
        "mechanism": "quartz",
        "price": 150,
        "strap": "rubber",
        "glass": "mineral",
        "waterResistance": "20 ATM",
        "rating": [
            {
                "userId": "64ce47c70bc299cc98f4a978",
                "userRating": 4,
                "_id": "64ce48100bc299cc98f4a982"
            },
            {
                "userId": "64ce498f0bc299cc98f4a9f7",
                "userRating": 4,
                "_id": "64ce4a3a0bc299cc98f4aa27"
            },
            {
                "userId": "656f045a2c1edb6f5ed97233",
                "userRating": 5,
                "_id": "656f04882c1edb6f5ed97283"
            }
        ],
        "__v": 0 
}
const mockWatchRating = 2;


test("user should fetch a watch and display correct watch details", async () => {

await act(async () => {
    watchService.getWatch.mockResolvedValue({data: mockWatch});
    watchService.getRate.mockResolvedValue({data: mockWatchRating});
   // store.dispatch(getSingleWatchAction(mockWatch._id));
   // store.dispatch(getWatchRatingAction(mockWatch._id));

    render(
        <Provider store={store}>
            <MemoryRouter>
            <SingleWatch />
            </MemoryRouter>
        </Provider>
    )
})

    const watchBrand = await screen.findByText(new RegExp(mockWatch.brand, 'i'))
    const watchModel = await screen.findByText(new RegExp(mockWatch.model, 'i'))
    const watchBattery = await screen.findByText(new RegExp(mockWatch.battery, 'i'))
    const watchMechanism = await screen.findByText(new RegExp(mockWatch.mechanism, 'i'))
    const watchPrice = await screen.findByText(new RegExp(mockWatch.price, 'i'))
    const watchStrap = await screen.findByText(new RegExp(mockWatch.strap, 'i'))
    const watchGlass = await screen.findByText(new RegExp(mockWatch.glass, 'i'))
    const watchWaterResistance = await screen.findByText(new RegExp(mockWatch.waterResistance, 'i'))
    const watchAverageRating = await screen.findByText(/average rating: 2/i)
    
    expect(watchBrand).toBeInTheDocument()
    expect(watchModel).toBeInTheDocument()
    expect(watchBattery).toBeInTheDocument()
    expect(watchMechanism).toBeInTheDocument()
    expect(watchPrice).toBeInTheDocument()
    expect(watchStrap).toBeInTheDocument()
    expect(watchGlass).toBeInTheDocument()
    expect(watchWaterResistance).toBeInTheDocument()
    expect(watchAverageRating).toBeInTheDocument()
})

test("guest user should not see any buttons or links", async () => {

    await act(async () => {
        watchService.getWatch.mockResolvedValue({data: mockWatch});
        watchService.getRate.mockResolvedValue({data: mockWatchRating});
       // store.dispatch(getSingleWatchAction(mockWatch._id));
       // store.dispatch(getWatchRatingAction(mockWatch._id));
    
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SingleWatch />
                </MemoryRouter>
            </Provider>
        )
    })

 const buttons = screen.queryAllByRole('button')
 const links = screen.queryAllByRole('link')
 expect(buttons.length).toBe(0)
 expect(links.length).toBe(0)
})

test("logged-in user should see 'Rate' and 'Add To Cart' buttons", async () => {

    await act(async () => {
        watchService.getWatch.mockResolvedValue({data: mockWatch});
        watchService.getRate.mockResolvedValue({data: mockWatchRating});
        store.dispatch(confirmedLoginAction({_id:'1',email:'ivan@abv.bg',accessToken:'token',isOwner:false}))
    
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SingleWatch />
                </MemoryRouter>
            </Provider>
        )
    })

    const addToCartButton = await screen.findByRole('button',{name:'Add To Cart'})
    const rateComponent = await screen.findByTestId('star-rating-component')
    expect(addToCartButton).toBeInTheDocument()
    expect(rateComponent).toBeInTheDocument()
})

})