import React from "react"
import { MoviesList } from '../components/MoviesList';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

//вытаскиваем переменную с ключом
const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component{
    state = {
        movies: [],
        loading: true, //при старте страницы
    }

      // Каждый компонент React проходит несколько стадий в процессе своей жизни: он создается, затем добавляется в DOM, получает пропсы, и, наконец, удаляется из дерева. Этот процесс называют жизненным циклом компонента (Component Lifecycle). React предоставляет набор методов, которые позволяют встроиться в этот процесс.

    componentDidMount(){
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avatar`)
        .then(response => response.json()) //преобразовать
        .then(data => this.setState({ movies: data.Search, loading: false})) //получение данных из запроса
        .catch(err => {
            console.log(err)
            this.setState({ loading: false});
        })
    }

    //объявление фильмов при поиске
    searchMovies = (str, type = 'all') => {
        //При начале загрузки
        this.setState({ loading: true });
        //принимает поисковую строка
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
        //передаём строку, которая была передана
        .then(response => response.json()) //преобразовать
        .then(data => this.setState({ movies: data.Search, loading: false}))
        .catch(err => {
            console.log(err)
            this.setState({ loading: false});
        })
    }

    render(){
        const{ movies, loading } = this.state;
        return <main className="content">
            <Search searchMovies={this.searchMovies} />
            {/* проверка */}
            {
                loading ? (
                    <Preloader />
                ) : (
                    <MoviesList movies={movies} />
                )
            }
        </main>
    }
}

export { Main }