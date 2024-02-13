
import { act } from 'react-dom/test-utils'
import * as watchService from '../../services/watchService'
import { store } from '../../store/store'
import * as watchActions from '../../store/actions/watchActions'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import SingleWatch from './SingleWatch'
import * as authActions from '../../store/actions/authActions'
import { addWatchToCartAction, confirmedAddWatchToCartAction, confirmedLoginAction,failedAddWatchToCartAction } from '../../store/actions/authActions'
import userEvent from '@testing-library/user-event'

jest.mock('../../services/watchService', () => ({
    getWatch: jest.fn(),
    getRate: jest.fn(),
    deleteWatch: jest.fn(),
    addWatchToCart: jest.fn()
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



beforeEach(() => {
    jest.clearAllMocks()
    
})

afterEach(() => {
    // restore the spy created with spyOn
   // jest.restoreAllMocks();
    jest.clearAllMocks()
  });


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

describe("logged-in user functionality", () => {
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
    
    test("clicking 'Add To Cart' button should call addWatchToCartAction()", async() => {
    
        let spyAddWatchToCartAction;
        spyAddWatchToCartAction = jest.spyOn(authActions,"addWatchToCartAction")
    
        await act(async () => {
            watchService.getWatch.mockResolvedValue({data: mockWatch});
            watchService.getRate.mockResolvedValue({data: mockWatchRating});
            store.dispatch(confirmedLoginAction({_id:'1',email:'ivan@abv.bg',accessToken:'token',isOwner:false}))
            watchService.addWatchToCart.mockResolvedValue(mockWatch)
    
            render(
                <Provider store={store}>
                    <MemoryRouter>
                    <SingleWatch  />
                    </MemoryRouter>
                </Provider>
            )
        })
    
        const addToCartButton = await screen.findByRole('button',{name:'Add To Cart'})
        fireEvent.click(addToCartButton)
        expect(spyAddWatchToCartAction).toHaveBeenCalledTimes(1)
    })
    
    test("should successfully add the watch to the user's shop cart in redux state", async () => { 
        
        await act(async () => {
            watchService.getWatch.mockResolvedValue({data: mockWatch});
            watchService.getRate.mockResolvedValue({data: mockWatchRating});
            store.dispatch(confirmedLoginAction({_id:'1',email:'ivan@abv.bg',accessToken:'token',isOwner:false}));
            watchService.addWatchToCart.mockResolvedValue(mockWatch);
            store.dispatch(confirmedAddWatchToCartAction(mockWatch))
    
            render(
                <Provider store={store}>
                    <MemoryRouter>
                    <SingleWatch />
                    </MemoryRouter>
                </Provider>
            )
        })
      
        const userShopCart = store.getState().auth.shopCart
        
        expect(userShopCart).toContain(mockWatch)
        //console.log(userShopCart)
    })
    
    test('should display error message if watch is already added in the user shop cart', async () => {
        
        const errorMessageText = 'watch has already been added to cart';
        
        await act(async () => {
          watchService.getWatch.mockResolvedValue({ data: mockWatch });
          watchService.getRate.mockResolvedValue({ data: mockWatchRating });
          store.dispatch(confirmedLoginAction({ _id: '1', email: 'ivan@abv.bg', accessToken: 'token', isOwner: false }));
          watchService.addWatchToCart.mockRejectedValue(new Error(errorMessageText));
          store.dispatch(failedAddWatchToCartAction("watch has already been added to cart"))
          
          
          render(
            <Provider store={store}>
              <MemoryRouter>
                <SingleWatch />
              </MemoryRouter>
            </Provider>
          );
    
        });
        
        const errorMessage = screen.queryByText(/watch has already been added to cart/i);
        expect(errorMessage).toBeInTheDocument();
      });
})

describe("Admin functionality", () => {
    test("admin user should see 'Delete' and 'Edit' buttons", async () => {

        await act(async () => {
            watchService.getWatch.mockResolvedValue({data: mockWatch});
            watchService.getRate.mockResolvedValue({data: mockWatchRating});
            store.dispatch(confirmedLoginAction({_id:'1',email:'adminW@abv.bg',accessToken:'token',isOwner:true}))
        
            render(
                <Provider store={store}>
                    <MemoryRouter>
                    <SingleWatch />
                    </MemoryRouter>
                </Provider>
            )
        })
    
        const deleteButton = await screen.findByRole('button',{name:'Delete'})
        const editButton = await screen.findByRole('link',{name:'Edit'})
        expect(deleteButton).toBeInTheDocument()
        expect(editButton).toBeInTheDocument()
    })
    
    test("when admin clicks 'Delete' button confirmation message should appear", async () => {
    
        await act(async () => {
            watchService.getWatch.mockResolvedValue({data: mockWatch});
            watchService.getRate.mockResolvedValue({data: mockWatchRating});
            store.dispatch(confirmedLoginAction({_id:'1',email:'adminW@abv.bg',accessToken:'token',isOwner:true}))
        
            render(
                <Provider store={store}>
                    <MemoryRouter>
                    <SingleWatch />
                    </MemoryRouter>
                </Provider>
            )
        })
        const confirmMock = jest.fn()
        global.window.confirm = confirmMock
        const deleteButton = await screen.findByRole('button',{name:'Delete'})
        fireEvent.click(deleteButton);
        expect(confirmMock).toHaveBeenCalledWith('Are you sure you want to delete this watch?');
    })
    
    test("after successful delete confirmation it should delete the watch and redirect to homepage", async () => {
    
        let deleteWatchActionSpy;
        let confirmSpy;
      
        await act(async () => {
          watchService.getWatch.mockResolvedValue({ data: mockWatch });
          watchService.getRate.mockResolvedValue({ data: mockWatchRating });
          store.dispatch(confirmedLoginAction({ _id: '1', email: 'adminW@abv.bg', accessToken: 'token', isOwner: true }));
          watchService.deleteWatch.mockResolvedValue({ data: '' });
      
          deleteWatchActionSpy = jest.spyOn(watchActions, 'deleteWatchAction');
          confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
       
      
          render(
            <Provider store={store}>
              <MemoryRouter>
                <SingleWatch />
              </MemoryRouter>
            </Provider>
          );
        });
      
        await act(async () => {
          const deleteButton = await screen.findByRole('button', { name: 'Delete' });
          fireEvent.click(deleteButton);
        });
      
          expect(confirmSpy).toHaveBeenCalledTimes(1);
          expect(deleteWatchActionSpy).toHaveBeenCalledTimes(1);
          expect(window.location.pathname).toBe("/");
      });
})

 

})