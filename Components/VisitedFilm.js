
//Films visionnés VisitedFilm.js
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'


class VisitedFilm extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <FilmList
          films={this.props.visitedFilm}
          navigation={this.props.navigation}
          visitedList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  text_container: {
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    visitedFilm: state.toggleVisited.visitedFilm
  }
}

export default connect(mapStateToProps)(VisitedFilm)
