// Components/FilmDetailsVisited.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'


class FilmDetailsVisited extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: false
    }
    this._toggleVisited = this._toggleVisited.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  componentDidMount() {

    const visitedFilmIndex = this.props.visitedFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
      if (visitedFilmIndex !== -1) {
          this.setState({
        film: this.props.visitedFilm[visitedFilmIndex]
      }, () => { this._updateNavigationParams() })
      return
   }

    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }


  _toggleVisited(){
    const action = {type: "TOGGLE_VISITED", value :this.state.film }
    this.props.dispatch(action)
  }

  _displayVisitedText() {
    var text = 'Marquer comme vu'
    if (this.props.isVisitedFilm) {
     // Si la props du film vaut true, on affiche : film marqué comme vu
     text = 'Non vu '
    }
    return
    <TouchableOpacity
        style={styles.visited_container}
        onPress={() =>this._toggleVisited()}>
          <Text style={styles.visitedText_container}>{text}</Text>
    </TouchableOpacity>
}

  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>

          <TouchableOpacity
              style={styles.visited_container}
              onPress={() =>this._toggleVisited()}>
                {this._displayVisitedText()}
          </TouchableOpacity>


        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center',
  },
  visited_container:{
    alignItems: 'center',
    backgroundColor: '#009933',
    height: 25,
  },
  visitedText_container:{
    color: '#9fa4a3',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = (state) => {
  return {

    visitedFilm: state.toggleVisited.visitedFilm
  }
}

export default connect(mapStateToProps)(FilmDetailsVisited)
