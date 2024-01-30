// components/Watches/Watches.test.js
import React from 'react';
import { render, screen,act, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Watches from './Watches';
import { MemoryRouter } from 'react-router-dom';
import * as watchService from '../../services/watchService'
import * as authService from '../../services/authService'
import { getAllWatchesAction, increasePageAction} from '../../store/actions/watchActions';
import { store } from '../../store/store';
import { confirmedLoginAction,} from '../../store/actions/authActions';



const middlewares = [thunk];


jest.mock('../../services/watchService', () => ({
  getAllWatches: jest.fn(),
}));




describe('Watches component', () => {
 
  const mockWatches = [
    {
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
  },
  {
      "_id": "64ce449f0bc299cc98f4a95f",
      "brand": "Omega",
      "model": "new model",
      "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
      "battery": "no",
      "mechanism": "automatic",
      "price": 500,
      "strap": "metal",
      "glass": "sapphire",
      "waterResistance": "no",
      "rating": [
          {
              "userId": "64ce47c70bc299cc98f4a978",
              "userRating": 5,
              "_id": "64ce48c80bc299cc98f4a9af"
          },
          {
              "userId": "64ce498f0bc299cc98f4a9f7",
              "userRating": 4,
              "_id": "64ce4a820bc299cc98f4aa42"
          },
          {
              "userId": "64d6266539c834f942b18c4b",
              "userRating": 3,
              "_id": "64d626a839c834f942b18c75"
          }
      ],
      "__v": 0
  },
 
  ];

  const mockIncreasePageAction = jest.fn()
  const mockDecreasePageAction = jest.fn()


  test("fetches all watches and display them correctly", async() => {
    
    
    await act(async() => {

      watchService.getAllWatches.mockResolvedValue({ data: mockWatches });

      store.dispatch(getAllWatchesAction(1, 5));
    
      // Render the component with the mocked store
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Watches />
          </MemoryRouter>
        </Provider>
      );

    })

    const newStateAfterRender = store.getState();
    const firstWatch = await screen.findByText(/brand: casio/i)
    const firstWatchModel = await screen.findByText(/model: g-shock/i)
    const firstWatchPrice = await screen.findByText(/price: € 150/i)
    const WatchDetailsLinks = await screen.findAllByText(/details/i)
    expect(firstWatch).toBeInTheDocument()
    expect(firstWatchModel).toBeInTheDocument()
    expect(firstWatchPrice).toBeInTheDocument()
    expect(WatchDetailsLinks.length).toBe(mockWatches.length)
    expect(newStateAfterRender.watches.watches).toEqual(mockWatches);
})

test("guest user should see 'You must be logged in to buy'", async() => {

  await act(async() => {

    watchService.getAllWatches.mockResolvedValue({ data: mockWatches });

    store.dispatch(getAllWatchesAction(1, 5));
  
    // Render the component with the mocked store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Watches />
        </MemoryRouter>
      </Provider>
    );

  })

  const informationTexts = await screen.findAllByText(/you must be logged in to buy/i)
  expect(informationTexts.length).toBe(mockWatches.length)

})

test("logged in user should not see 'You must be logged in to buy'", async() => {
 //const navigate = useNavigate()
  await act(async() => {

    watchService.getAllWatches.mockResolvedValue({ data: mockWatches });

    store.dispatch(getAllWatchesAction(1, 5));
    store.dispatch(confirmedLoginAction({_id:'1',email:'ivan@abv.bg',accessToken:'token',isOwner:false}))
  
    // Render the component with the mocked store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Watches />
        </MemoryRouter>
      </Provider>
    );

  })

  const informationTexts = screen.queryAllByText(/you must be logged in to buy/i)
  const authState = store.getState().auth.auth
  expect(informationTexts.length).not.toBe(mockWatches.length)
  expect(informationTexts.length).toBe(0)
  expect(authState).toEqual({_id:'1',email:'ivan@abv.bg',accessToken:'token',isOwner:false})

})

test("should display 'No watches available' if there are no watches", async () => {

  await act(async() => {

    watchService.getAllWatches.mockResolvedValue({ data: [] });

    store.dispatch(getAllWatchesAction(1, 5));
  
    // Render the component with the mocked store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Watches />
        </MemoryRouter>
      </Provider>
    );

  })

    const text = screen.getByText(/No watches available/i)
    expect(text).toBeInTheDocument()
})

test('guest user and logged-in user should see following buttons:Next Page , Previous Page', async () => {
  
  await act(async() => {

    watchService.getAllWatches.mockResolvedValue({ data: mockWatches });

    store.dispatch(getAllWatchesAction(1, 5));
  
    // Render the component with the mocked store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Watches  />
        </MemoryRouter>
      </Provider>
    );

  })

  const previousButton = screen.getByRole('button',{name:'Previous Page'})
  const nextButton = screen.getByRole('button',{name:'Next Page'})
  expect(previousButton).toBeInTheDocument()
  expect(nextButton).toBeInTheDocument()

})

test('should contain and use following components: WatchesCard',async () => {

  await act(async() => {

    watchService.getAllWatches.mockResolvedValue({ data: mockWatches });

    store.dispatch(getAllWatchesAction(1, 5));
  
    // Render the component with the mocked store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Watches />
        </MemoryRouter>
      </Provider>
    );

  })

  const watchesCardComponent = await screen.findAllByTestId('watches-card-component')
  expect(watchesCardComponent.length).toBe(mockWatches.length)
  expect(watchesCardComponent.length).not.toBe(0)
})

test("if watches are more than 5 should increase currentPage by 1 when click 'Next Page' button", async() => {

const moreWatches = [
  {
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
},
{
    "_id": "64ce449f0bc299cc98f4a95f",
    "brand": "Omega",
    "model": "new model",
    "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
    "battery": "no",
    "mechanism": "automatic",
    "price": 500,
    "strap": "metal",
    "glass": "sapphire",
    "waterResistance": "no",
    "rating": [
        {
            "userId": "64ce47c70bc299cc98f4a978",
            "userRating": 5,
            "_id": "64ce48c80bc299cc98f4a9af"
        },
        {
            "userId": "64ce498f0bc299cc98f4a9f7",
            "userRating": 4,
            "_id": "64ce4a820bc299cc98f4aa42"
        },
        {
            "userId": "64d6266539c834f942b18c4b",
            "userRating": 3,
            "_id": "64d626a839c834f942b18c75"
        }
    ],
    "__v": 0
},
{
  "_id": "64ce44580bc299cc98f4a95d",
  "brand": "Casio1",
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
},
{
  "_id": "64ce449f0bc299cc98f4a95c",
  "brand": "Omega1",
  "model": "new model",
  "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
  "battery": "no",
  "mechanism": "automatic",
  "price": 500,
  "strap": "metal",
  "glass": "sapphire",
  "waterResistance": "no",
  "rating": [
      {
          "userId": "64ce47c70bc299cc98f4a978",
          "userRating": 5,
          "_id": "64ce48c80bc299cc98f4a9af"
      },
      {
          "userId": "64ce498f0bc299cc98f4a9f7",
          "userRating": 4,
          "_id": "64ce4a820bc299cc98f4aa42"
      },
      {
          "userId": "64d6266539c834f942b18c4b",
          "userRating": 3,
          "_id": "64d626a839c834f942b18c75"
      }
  ],
  "__v": 0
},
{
  "_id": "64ce44580bc299cc98f4a95h",
  "brand": "Casio2",
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
},
{
  "_id": "64ce449f0bc299cc98f4a95t",
  "brand": "Omega2",
  "model": "new model",
  "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
  "battery": "no",
  "mechanism": "automatic",
  "price": 500,
  "strap": "metal",
  "glass": "sapphire",
  "waterResistance": "no",
  "rating": [
      {
          "userId": "64ce47c70bc299cc98f4a978",
          "userRating": 5,
          "_id": "64ce48c80bc299cc98f4a9af"
      },
      {
          "userId": "64ce498f0bc299cc98f4a9f7",
          "userRating": 4,
          "_id": "64ce4a820bc299cc98f4aa42"
      },
      {
          "userId": "64d6266539c834f942b18c4b",
          "userRating": 3,
          "_id": "64d626a839c834f942b18c75"
      }
  ],
  "__v": 0
},
]

  await act(async() => {

    watchService.getAllWatches.mockResolvedValue({ data: moreWatches });

    store.dispatch(getAllWatchesAction(1, 5));
  
    // Render the component with the mocked store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Watches increasePageAction={mockIncreasePageAction} />
        </MemoryRouter>
      </Provider>
    );

  })
  
 await act(async() => {
  const nextButton = await screen.findByRole('button',{name:'Next Page'})
    fireEvent.click(nextButton)
 })

 const currentPage = store.getState().watches.currentPage
  expect(currentPage).toBe(2)
  expect(currentPage).not.toBe(1)
})

test("if we are at page 2 and click 'Previous Page' button we should go to page 1", async() => {

  const moreWatches = [
    {
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
  },
  {
      "_id": "64ce449f0bc299cc98f4a95f",
      "brand": "Omega",
      "model": "new model",
      "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
      "battery": "no",
      "mechanism": "automatic",
      "price": 500,
      "strap": "metal",
      "glass": "sapphire",
      "waterResistance": "no",
      "rating": [
          {
              "userId": "64ce47c70bc299cc98f4a978",
              "userRating": 5,
              "_id": "64ce48c80bc299cc98f4a9af"
          },
          {
              "userId": "64ce498f0bc299cc98f4a9f7",
              "userRating": 4,
              "_id": "64ce4a820bc299cc98f4aa42"
          },
          {
              "userId": "64d6266539c834f942b18c4b",
              "userRating": 3,
              "_id": "64d626a839c834f942b18c75"
          }
      ],
      "__v": 0
  },
  {
    "_id": "64ce44580bc299cc98f4a95d",
    "brand": "Casio1",
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
  },
  {
    "_id": "64ce449f0bc299cc98f4a95c",
    "brand": "Omega1",
    "model": "new model",
    "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
    "battery": "no",
    "mechanism": "automatic",
    "price": 500,
    "strap": "metal",
    "glass": "sapphire",
    "waterResistance": "no",
    "rating": [
        {
            "userId": "64ce47c70bc299cc98f4a978",
            "userRating": 5,
            "_id": "64ce48c80bc299cc98f4a9af"
        },
        {
            "userId": "64ce498f0bc299cc98f4a9f7",
            "userRating": 4,
            "_id": "64ce4a820bc299cc98f4aa42"
        },
        {
            "userId": "64d6266539c834f942b18c4b",
            "userRating": 3,
            "_id": "64d626a839c834f942b18c75"
        }
    ],
    "__v": 0
  },
  {
    "_id": "64ce44580bc299cc98f4a95h",
    "brand": "Casio2",
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
  },
  {
    "_id": "64ce449f0bc299cc98f4a95t",
    "brand": "Omega2",
    "model": "new model",
    "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
    "battery": "no",
    "mechanism": "automatic",
    "price": 500,
    "strap": "metal",
    "glass": "sapphire",
    "waterResistance": "no",
    "rating": [
        {
            "userId": "64ce47c70bc299cc98f4a978",
            "userRating": 5,
            "_id": "64ce48c80bc299cc98f4a9af"
        },
        {
            "userId": "64ce498f0bc299cc98f4a9f7",
            "userRating": 4,
            "_id": "64ce4a820bc299cc98f4aa42"
        },
        {
            "userId": "64d6266539c834f942b18c4b",
            "userRating": 3,
            "_id": "64d626a839c834f942b18c75"
        }
    ],
    "__v": 0
  },
  ]
  
    await act(async() => {
  
      watchService.getAllWatches.mockResolvedValue({ data: moreWatches });
  
      store.dispatch(getAllWatchesAction(1, 5));
    
      // Render the component with the mocked store
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Watches increasePageAction={mockIncreasePageAction} />
          </MemoryRouter>
        </Provider>
      );
  
    })
    
   await act(async() => {
    const nextButton = await screen.findByRole('button',{name:'Next Page'})
      fireEvent.click(nextButton)
   })

   await act(async() => {
    const previousButton = await screen.findByRole('button',{name:'Previous Page'})
    fireEvent.click(previousButton)
   })
  
   const currentPage = store.getState().watches.currentPage
    expect(currentPage).toBe(1)
    expect(currentPage).not.toBe(2)
  })

});