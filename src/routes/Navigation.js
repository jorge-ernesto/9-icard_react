import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes'

export const Navigation = () => {
    console.log('routes ---->', routes)

    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<route.layout children={<route.component />} />}
                            />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}
