// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItemVisited from './FilmItemVisited'
import { connect } from 'react-redux'

class FilmListVisited extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film " + idFilm)
    this.props.navigation.navigate('FilmDetails', {idFilm: idFilm})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.films}
          extraData1={this.props.visitedFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <FilmItemVisited
              film={item}
              isVisitedFilm={(this.props.visitedFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              this.props.loadFilms()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    visitedFilm: state.toggleVisited.visitedFilm
      }

  }


export default connect(mapStateToProps)(FilmListVisited)
