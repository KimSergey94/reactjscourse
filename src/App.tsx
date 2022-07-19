import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Action, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'
import './main.global.less'
import { CardsList } from './shared/CardsList'
import { Content } from './shared/components/Content'
import { Header } from './shared/Header'
import {
  displayTypeContext,
  TDisplayType,
} from './shared/lib/react/context/displayTypeContext'
import { UserContextProvider } from './shared/lib/react/context/userContext'
import { useDisplayType } from './shared/lib/react/hooks/useDisplayType'
import { rootReducer, RootState } from './shared/lib/react/store/store'
import { NotFoundForm } from './shared/NotFoundForm'
import { Post } from './shared/Post'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const timeout =
  (ms: number): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, _getState) => {
    dispatch({ type: 'START' })
    setTimeout(() => {
      dispatch({ type: 'FINISH' })
    }, ms)
  }

function AppComponent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    //@ts-ignore
    store.dispatch(timeout(1500))
  }, [])

  // const [posts] = usePostsData();
  const [displayType] = useDisplayType()
  const MainRoutes = () => {
    return (
      <>
        <Header />
        <Content>
          <Routes>
            <Route path="posts" element={<CardsList />}>
              <Route
                path=":id"
                element={
                  <Post title={''} author={''} cardId={''} onClose={() => {}} />
                }
              />
            </Route>
            <Route path="/auth" element={<Navigate to="/posts" />} />
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="*" element={<Navigate replace to="/notfound" />} />
          </Routes>
        </Content>
      </>
    )
  }

  return (
    <Provider store={store}>
      {mounted && (
        <BrowserRouter>
          <UserContextProvider>
            <displayTypeContext.Provider
              value={{ displayType: displayType as TDisplayType }}
            >
              <Content>
                <Routes>
                  <Route path="/notfound/" element={<NotFoundForm />} />
                  <Route path="*" element={<MainRoutes />} />
                </Routes>
              </Content>
            </displayTypeContext.Provider>
          </UserContextProvider>
        </BrowserRouter>
      )}
    </Provider>
  )
}

export const App = hot(() => <AppComponent />)
