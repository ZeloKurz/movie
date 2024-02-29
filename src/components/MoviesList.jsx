import { Movie } from "./Movie";

function MoviesList(props){
    const{
        movies = []
    } = props;

    return <div className="movies">
        {movies.length ? movies.map(movie => (
            <Movie key={Movie.id}{...movie} />
        )) : <h5>Nothing found</h5>

        }
    </div>
}

export { MoviesList }
