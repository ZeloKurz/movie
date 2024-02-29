import React from "react";

class Search extends React.Component{
    state = {
        search: '',
        type: 'all', //по умолчанию будем искать все типы
    }

    //отправка функции с названием искомого фильма
    handleKey = (event) => {
        if (event.key === 'Enter'){
            this.props.searchMovies(this.state.search, this.state.type);
        }
    }

    //обновление поиска
    handleFilter = (event) => {
        //когда происходит изменение, то обращаемся к функции изменения состояния
        this.setState(() => ({ type: event.target.dataset.type }), () => {
            this.props.searchMovies(this.state.search, this.state.type); //вызываем функцию каждый раз, когда происходят изменения
        });
    }

    render(){
        return(
            <div>
                <div className="row search">
                    <input id="search_inline" type="search" placeholder="search" className="validate" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} onKeyDown={this.handleKey} />
                    <a className="waves-effect btn light-blue" onClick={() => this.props.searchMovies(this.state.search, this.state.type)}>Search</a>
                </div>

                {/* добавим инпут из материалайза (радио метки) */}
                <div className="radio_Movies">
                    <label>
                        <input className="with-gap" name="group" type="radio" checked={this.state.type === "all"} data-type="all" onChange={this.handleFilter} />
                        <span>All</span>
                    </label>
                    <label>
                        <input className="with-gap" name="group" type="radio" checked={this.state.type === "movie"} data-type="movie" onChange={this.handleFilter} />
                        <span>Movies only</span>
                    </label>
                    <label>
                        <input className="with-gap" name="group" type="radio" checked={this.state.type === "series"} data-type="series" onChange={this.handleFilter} />
                        <span>Series only</span>
                    </label>
                </div>
            </div>
        )
    }
}

export { Search }