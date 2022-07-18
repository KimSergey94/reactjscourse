import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Action, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'
import { useDisplayType } from './hooks/useDisplayType'
import './main.global.less'
import { CardsList } from './shared/CardsList/CardsList'
import { Content } from './shared/Content/Content'
import {
  displayTypeContext,
  TDisplayType,
} from './shared/context/displayTypeContext'
import { UserContextProvider } from './shared/context/userContext'
import { Header } from './shared/Header/Header'
import { Layout } from './shared/Layout/Layout'
import { NotFoundForm } from './shared/NotFoundForm/NotFoundForm'
import { Post } from './shared/Post'
import { rootReducer, RootState } from './store/store'

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
              <Layout>
                <Routes>
                  <Route path="/notfound/" element={<NotFoundForm />} />
                  <Route path="*" element={<MainRoutes />} />
                </Routes>
              </Layout>
            </displayTypeContext.Provider>
          </UserContextProvider>
        </BrowserRouter>
      )}
    </Provider>
  )
}

export const App = hot(() => <AppComponent />)
