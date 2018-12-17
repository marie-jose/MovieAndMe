// Components/FilmItemVisited.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import { getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import FadeIn from '../Animations/FadeIn'

class FilmItemVisited extends React.Component {


  _onLongPressButton() {
    return (
    <View style={styles.date_container}>
      <Text style={styles.date_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
    </View>

  )
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
  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <FadeIn>
        <TouchableOpacity style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}>
          <Image style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{film.title}</Text>
              <TouchableHighlight style={styles.fallout}
                  onLongPress={this._onLongPressButton} underlayColor="red">
                 <View style={styles.button}>
                   <Text style={styles.text_fallout}>Fallout</Text>
                 </View>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 10,
    marginLeft: 5,
    height: 100,
    flexDirection: 'row'
  },
  image: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 80/2,
    resizeMode: 'cover'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title_text: {
    fontWeight: 'normal',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    textAlign: 'center'
  },
  button: {
    marginBottom: 10,
    width: 80,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  fallout: {
    flex: 1
  },
  text_fallout:{
    fontSize: 15,
    fontStyle: 'italic',
    paddingLeft: 5,
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
})

export default FilmItemVisited
