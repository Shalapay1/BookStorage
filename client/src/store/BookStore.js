import { makeAutoObservable } from "mobx"

export default class BookStore {
    constructor() {
        this._genres = [
            
        ]
        this._autors = [
        ]
        this._books = [
            
        ]
        this._selectedGenre = {}
        
        makeAutoObservable(this)
    }

    setGenres(genres){
        this._genres = genres
    }

    setAutors(autors){
        this._autors = autors
    }

    setBook (books){
        this._books = books
    }

    setSelectedGenre (genre) {
        this._selectedGenre = genre
    }

    get genres() {
        return this._genres
    }
    
    get autors() {
        return this._autors
    }

    get books() {
        return this._books
    }

    get selectedGenre() {
        return this._selectedGenre
    }
}