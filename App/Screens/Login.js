'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Api = require('../Api/Core');
var Chef = require('../Api/Chef');
var Colors = require('../Utilities/Colors');
var Alert = require('../Components/Alert');
var Spinner = require('../Components/Spinner');
var StatusBar = require('../Components/StatusBar');
var Constants = require('../Constants/StorageConstants');

var {
  AsyncStorage,
  ActivityIndicatorIOS,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  Platform,
  ToastAndroid,
} = React;

var Login = React.createClass({

  getInitialState() {
    return {
      isLoading: false,
      error: false,
      username: 'meticulous-dft',
      password: 'toratora',

    }
  },

  renderError() {
    // return (
    //   <View style={styles.errorContainer}>
    //     <Text style={styles.errorText}>{this.props.error}</Text>
    //   </View>
    // )
  },

  handleSubmit() {
    if(!this.state.username || !this.state.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if(this.state.password.length < 5) {
      Alert.alert('Error', 'Please enter a valid password.');
      return;
    }

    this.setState({ isLoading: true });

    var params = {
      username: this.state.username,
      password: this.state.password,
      remember_me: true
    };

    Chef.post('/api/login', params)
      .then((res) => {
        if (res.error) {
          this.setState({
            isLoading: false,
            username: this.state.username,
            password: this.state.password
          });
          Alert.alert('Sign In Failed', res.error);
        } else {
          this.props.updateProfile(res);
          this.setState({ isLoading: false, error: false });
          this._cacheUserIdentity().done();
          this.props.navigator.replace({ id: 'my_apps' });
        }
    });
  },

  async _cacheUserIdentity() {
    try {
      // store username && password
      await AsyncStorage.setItem(Constants.USERNAME, this.state.username);
      await AsyncStorage.setItem(Constants.PASSWORD, this.state.password);
    } catch (err) {
      console.log('Can not save user identity. Error is '+err);
    }
  },

  async _loginFromCache() {
    try {
      var username = await AsyncStorage.getItem(Constants.USERNAME);
      var password = await AsyncStorage.getItem(Constants.PASSWORD);
      if (username && password) {
        this.setState({
          isLoading: true,
          username: username,
          password: password
        });
        this.handleSubmit();
      }
    } catch (err) {
      console.log("Fail to retrive user identity from cache. Error is "+err);
    }
  },

  componentDidMount() {
    this._loginFromCache().done();
  },

  render() {
    StatusBar.setStyle('light-content');

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={"USERNAME"}
              autoCapitalize={"none"}
              autoCorrect={false}
              returnKeyType={'next'}
              onSubmitEditing={() => this.refs.pwField.focus()}
              style={styles.input}
              onChangeText={(text) => this.setState({username: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              ref="pwField"
              placeholder={"PASSWORD"}
              password={true}
              returnKeyType={'done'}
              onSubmitEditing={this.handleSubmit}
              style={styles.input}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>

          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableHighlight>

          {this.props.error && this.renderError()}

          <View style={{alignItems: 'center'}}>
            <Spinner isLoading={this.state.isLoading} />
          </View>
        </ScrollView>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 20 : null,
  },
  inputContainer: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : null,
    borderColor: Colors.lightGrey,
    margin: 10,
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: 14,
    color: 'black',
  },
  button: {
    backgroundColor: Colors.tintColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 45,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Avenir Next',
  },
  errorContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorText: {
    opacity: 0.6,
  },
});

var {updateProfile} = require('../Actions');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native'

export default connect(
  (state) => {
    return {
      profile: state.profile
    }
  },
  (dispatch) => {
    return bindActionCreators({updateProfile}, dispatch)
  }
)(Login)
