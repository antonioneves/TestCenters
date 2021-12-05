import React from 'react';
import {SearchBar} from 'react-native-elements';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import FilterButton from './FilterButton';

export default class TestCenterSearch extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;

    return (
      <SafeAreaView style={this.styles.searBarView}>
        <SearchBar
          platform="default"
          placeholder="Postcode or address"
          onChangeText={this.updateSearch}
          value={search}
          containerStyle={this.styles.searchContainer}
          inputContainerStyle={this.styles.searchBar}
          clearIcon
        />
        <FilterButton />
      </SafeAreaView>
    );
  }

  styles = StyleSheet.create({
    searchContainer: {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      width: '89%',
    },
    searchBar: {
      borderRadius: 50,
      backgroundColor: this.props.color === 'dark' ? Colors.dark : Colors.white,
    },
    searBarView: {
      flexDirection: 'row',
      padding: 10,
      paddingTop: 30,
    },
  });
}
