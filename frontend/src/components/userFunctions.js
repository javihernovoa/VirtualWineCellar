import axios from 'axios';
import Auth from './Auth';



export const register = newUser => {
    return axios 
        .post('http://127.0.0.1:5000/register', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post('http://127.0.0.1:5000/login', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            Auth.authenticateUser(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getWines = id => {
    return axios
        .post('http://127.0.0.1:5000/getWines', {
            id: id
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const addWine = (wine, id) => {
    return axios
        .post('http://127.0.0.1:5000/addWine', {
            wine: wine,
            id: id
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const editWine = newWine => {
    return axios 
        .post('http://127.0.0.1:5000/editWine', {
            id: newWine.id,
            name: newWine.name,
            year: newWine.year,
            country: newWine.country,
            grape: newWine.grape,
            alcohol: newWine.alcohol
        })
        .then(response => {
            console.log("Wine Edited")
        })
}
